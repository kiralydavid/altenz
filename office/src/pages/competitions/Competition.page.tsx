import { Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import { EntryContextProvider } from "@/db/EntryContextProvider";
import { TranslatedLabel } from "@/types/common/TranslatedLabel";
import { Language, LanguageContext } from "./settings/language-context";

export const CompetitionPage = () => {
  const { competitionId } = useParams();

  const [language, setLanguage] = useState<Language>("en");
  const t = (obj: TranslatedLabel) => obj[language] || obj.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, tl: t }}>
      <EntryContextProvider competitionId={competitionId}>
        <Outlet />
      </EntryContextProvider>
    </LanguageContext.Provider>
  );
};
