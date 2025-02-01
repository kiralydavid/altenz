import { ReactElement, useEffect, useMemo, useState } from "react";
import PouchDB from "pouchdb-browser";
import { useParams } from "react-router-dom";
import { CompetitionContext } from "./competition-context";
import { Competition } from "@/types/competition/Competition";

export const CompetitionContextProvider = ({ children }: { children: ReactElement }) => {
  const { competitionId } = useParams();
  const [db] = useMemo(
    () => [new PouchDB<Competition>("altenz_competitions", { auto_compaction: true })],
    [],
  );
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [competition, setCompetition] = useState<Competition | undefined>(undefined);

  const fetchCompetitions = async () => {
    setLoading(true);

    db.allDocs({
      include_docs: true,
    }).then((result) => {
      setLoading(false);
      setCompetitions(
        result.rows

          .map((row) => row.doc)
          .filter(
            (item): item is PouchDB.Core.ExistingDocument<Competition & PouchDB.Core.AllDocsMeta> =>
              !!item,
          ),
      );
    });
  };

  const putCompetition = async (document: Competition) => {
    await db.put(document);
    await fetchCompetitions();
  };

  const removeCompetition = async (document: Competition) => {
    if (document._rev) {
      await db.remove({ _id: document._id, _rev: document._rev });
      await fetchCompetitions();
    }
  };

  const getCompetition = (id: string | undefined) => competitions.find((item) => item._id === id);

  useEffect(() => {
    fetchCompetitions();
  }, [db]);

  useEffect(() => {
    setCompetition(competitions.filter((item) => item._id === competitionId)[0]);
  }, [competitions, competitionId]);

  return (
    <CompetitionContext.Provider
      value={{
        competition,
        competitions,
        loading,
        getCompetition,
        fetchCompetitions,
        putCompetition,
        removeCompetition,
      }}
    >
      {children}
    </CompetitionContext.Provider>
  );
};
