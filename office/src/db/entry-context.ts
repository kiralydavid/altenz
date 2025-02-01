import { createContext, useContext } from "react";
import { Entry } from "@/types/entry/Entry";

type EntryContextType = {
  entries: Entry[];
  loading: boolean;
  getEntry: (id: string | undefined) => Entry | undefined;
  removeEntry: (entry: Entry) => void;
  fetchEntries: () => Promise<void>;
  putEntry: (entry: Entry) => Promise<void>;
};

export const EntryContext = createContext<EntryContextType>({
  entries: [],
  loading: false,
  getEntry: () => undefined,
  removeEntry: () => undefined,
  fetchEntries: () => Promise.resolve(),
  putEntry: () => Promise.resolve(),
});

export const useEntryDB = () => useContext(EntryContext);
