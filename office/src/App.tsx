import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import "./App.css";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { en } from "./i18n/en";
import { Router } from "./Router";
import { theme } from "./theme";

i18n.use(initReactI18next).init({
  resources: {
    en,
  },
  lng: "en", // if you're using a language detector, do not define the lng option
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <Router />
      </ModalsProvider>
    </MantineProvider>
  );
}
