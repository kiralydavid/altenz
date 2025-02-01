import { find } from "es-toolkit/compat";
import { topOfGroup } from "./TopOfGroup";
import { Competition } from "@/types/competition/Competition";
import { Requirement } from "@/types/competition/Requirement";
import {Entry, EntryRound} from "@/types/entry/Entry";

const callRequirement = (
  requirement: Requirement,
  entry: Entry,
  competition: Competition,
  roundId: string,
) => {
  //remove
  competition;
  roundId;
  //

  switch (requirement.type) {
    case "TOP_OF_GROUP":
      return topOfGroup(entry, requirement.topCount, requirement.round);
    case "GROUP_SIZE":
      return true; //TODO::
    case "QUALIFICATION_LEVEL":
      return true; //TODO::
    case "IN_GROUP":
      return true; //TODO::
    default:
      throw new Error("Unknown requirement type");
  }
};

export const setQualified = (
  entries: Entry[],
  requirements: Requirement[],
  competition: Competition,
  roundId: string,
) => {
  for (const entry of entries) {
    let qualified = true;

    for (const requirement of requirements) {
      qualified = qualified && callRequirement(requirement, entry, competition, roundId);
    }

    const roundOfEntry = find<EntryRound>(entry.rounds, { roundId });

    if (!roundOfEntry) {
      throw new Error(`Missing round [${roundId}] of entry [${entry._id}]`);
    }

    roundOfEntry.qualified = qualified;
  }
};
