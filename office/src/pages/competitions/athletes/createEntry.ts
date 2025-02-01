import { Entry, EntryRound } from "@/types/entry/Entry";
import { Competition } from "@/types/competition/Competition";
import { nanoid12 } from "@/utils/utils";

export const createEntry = (
  formValues: Pick<Entry, "name" | "division" | "ageGroup" | "gender">,
  competition: Competition,
): Entry => {
  const rounds: EntryRound[] = competition.rounds.map((round) => ({
    roundId: round.id,
    courseId: round.courses[0],
    hits: [],
    placement: null,
    qualified: round.requirements.length === 0, //TODO: Check requirements of the round
    teamInfo: null,
  }));

  return {
    ...formValues,
    competition: competition._id,
    _rev: undefined,
    _id: nanoid12(),
    rounds,
    owner: "",
    placement: null,
  };
};
