import { filter, find, findIndex } from "es-toolkit/compat";
import { DisplayField } from "@/types/competition/Display";
import { Entry, EntryRound, Hit } from "@/types/entry/Entry";
import { Competition } from "@/types/competition/Competition";
import { scoreFromHits } from "./EntryUtils";
import { RoundId } from "@/types/competition/Round";
import { Course } from "@/types/competition/Course";

export const calculateDisplayValue = (
  field: DisplayField,
  entry: Entry,
  competition: Competition,
) => {
  switch (field.type) {
    case "PLACEMENT":
      return entry.placement;
    case "ROUND_PLACEMENT":
      return entryRoundPlacement(entry, field.round);
    case "SCORE":
      return field.rounds.reduce(
        (sum, roundId) =>
          sum +
          scoreFromHits(
            find<EntryRound>(entry.rounds, { roundId })?.hits || [],
            competition.scoring,
          ),
        0,
      );
    case "SCORING_VALUE_COUNT":
      return field.rounds.reduce(
        (sum, roundId) =>
          sum +
          (find<EntryRound>(entry.rounds, { roundId })?.hits || []).filter(
            (hit) => hit.scoringValueId === field.scoringValue,
          ).length,
        0,
      );
    case "STAKE_INDEX_SCORE": {
      const adjustedFieldStakeIndex = field.stakeIndex - 1;
      const entryRound = find<EntryRound>(entry.rounds, { roundId: field.round });
      if (!entryRound) {
        throw Error(`[STAKE_INDEX_SCORE] EntryRound not found ${field.round}`);
      }

      const courseId = entryRound.courseId;
      const course = find<Course>(competition.courses, { id: courseId });
      if (!course) {
        throw Error(`[STAKE_INDEX_SCORE] Course not found ${courseId}`);
      }

      const startStake = entryRound.teamInfo?.startStake || course.stakes[0].id;
      const startStakeIndex = findIndex(course.stakes, { id: startStake });
      const stakeIndex =
        (startStakeIndex + adjustedFieldStakeIndex + course.stakes.length) % course.stakes.length;
      const stakeId = course.stakes[stakeIndex].id;
      const hits = filter<Hit>(entryRound.hits, { stakeId }) || [];
      return scoreFromHits(hits, competition.scoring);
    }
    default:
      return 0;
  }
};

export const entryRoundPlacement = (entry: Entry, roundId: RoundId) => {
  const entryRound = entry.rounds.find((er) => er.roundId === roundId);

  if (!entryRound) {
    throw Error(`EntryRound not found. Entry: ${entry._id}. RoundId: ${roundId}`);
  }

  return entryRound.placement;
};
