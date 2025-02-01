import { createContext, useContext } from "react";
import { TranslatedLabel } from "@/types/common/TranslatedLabel";

export type Language = "en" | "hu" | "sk";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: Language) => void;
  tl: (obj: TranslatedLabel) => string | undefined;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  tl: () => "",
});

export const useLanguage = () => useContext(LanguageContext);
