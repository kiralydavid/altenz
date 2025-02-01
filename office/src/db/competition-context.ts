import { createContext, useContext } from "react";
import { Competition } from "@/types/competition/Competition";

type CompetitionContextType = {
  competition: Competition | undefined;
  competitions: Competition[];
  loading: boolean;
  getCompetition: (id: string | undefined) => Competition | undefined;
  fetchCompetitions: () => Promise<void>;
  putCompetition: (competition: Competition) => Promise<void>;
  removeCompetition: (competition: Competition) => Promise<void>;
};

export const CompetitionContext = createContext<CompetitionContextType>({
  competition: undefined,
  competitions: [],
  loading: false,
  getCompetition: () => undefined,
  fetchCompetitions: () => Promise.resolve(),
  putCompetition: () => Promise.resolve(),
  removeCompetition: () => Promise.resolve(),
});

export const useCompetitionDB = () => useContext(CompetitionContext);
