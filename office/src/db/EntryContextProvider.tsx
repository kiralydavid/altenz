import { ReactElement, useEffect, useMemo, useState } from "react";
import PouchDB from "pouchdb-browser";
import { EntryContext } from "./entry-context";
import { Entry } from "@/types/entry/Entry";

export const EntryContextProvider = ({
  children,
  competitionId,
}: {
  children: ReactElement;
  competitionId: string | undefined;
}) => {
  if (!competitionId) {
    return null;
  }

  const [db] = useMemo(
    () => [new PouchDB<Entry>(`altenz_entries_${competitionId}`, { auto_compaction: true })],
    [competitionId],
  );
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchEntries = async () => {
    setLoading(true);

    db.allDocs({
      include_docs: true,
    }).then((result) => {
      setLoading(false);
      setEntries(
        result.rows
          .map((row) => row.doc)
          .filter(
            (item): item is PouchDB.Core.ExistingDocument<Entry & PouchDB.Core.AllDocsMeta> =>
              !!item,
          ),
      );
    });
  };

  const putEntry = async (entry: Entry) => {
    await db.put(entry);
    await fetchEntries();
  };

  const getEntry = (id: string | undefined) => entries.find((item) => item._id === id);

  const removeEntry = async (entry: Entry) => {
    if (!entry._rev) {
      return;
    }

    await db.remove({ _id: entry._id, _rev: entry._rev });
    await fetchEntries();
  };

  useEffect(() => {
    fetchEntries();
  }, [db]);

  return (
    <EntryContext.Provider
      value={{
        entries,
        loading,
        getEntry,
        fetchEntries,
        putEntry,
        removeEntry,
      }}
    >
      {children}
    </EntryContext.Provider>
  );
};
