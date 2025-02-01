import { Outlet } from "react-router-dom";
import classes from "./Home.module.css";
import { Navbar } from "@/components/navbar/Navbar";
import { CompetitionContextProvider } from "@/db/CompetitionContextProvider";
import {sharedUtil} from "@altenz-shared";

export function HomePage() {
  console.log("Shared test: ", sharedUtil({message: "helloweb"}));

  return (
    <CompetitionContextProvider>
      <div className={classes.home}>
        <Navbar />
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </CompetitionContextProvider>
  );
}
