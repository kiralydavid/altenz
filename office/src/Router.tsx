import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/Home.page";
import { CompetitionsPage } from "./pages/competitions/Competitions.page";
import { TournamentsPage } from "./pages/tournaments/Tournaments.page";
import { SettingsPage } from "./pages/competitions/settings/Settings.page";
import { CompetitionPage } from "./pages/competitions/Competition.page";
import { AthletesPage } from "./pages/competitions/athletes/Athletes.page";
import { RoundPage } from "./pages/competitions/round/Round.page";
import { ResultsPage } from "./pages/competitions/results/Results.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/",
        element: <CompetitionsPage />,
      },
      {
        path: "/tournaments",
        element: <TournamentsPage />,
      },
      {
        path: "/c/:competitionId",
        element: <CompetitionPage />,
        children: [
          {
            path: "settings",
            element: <SettingsPage />,
          },
          {
            path: "athletes",
            element: <AthletesPage />,
          },
          {
            path: "r/:roundId",
            element: <RoundPage />,
          },
          {
            path: "results",
            element: <ResultsPage />,
          },
        ],
      },
      {
        path: "/round1",
        element: <TournamentsPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
