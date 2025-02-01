import { useState } from "react";
import { Button } from "@mantine/core";
import { range } from "es-toolkit/compat";
import clsx from "clsx";
import { produce } from "immer";
import { Entry } from "@/types/entry/Entry";
import { Round } from "@/types/competition/Round";
import { Competition } from "@/types/competition/Competition";
import { Stake } from "@/types/competition/Stake";
import { Target } from "@/types/competition/Target";
import { TargetDefaults } from "@/types/competition/TargetList";
import classes from "./Scorecard.module.css";
import { Scoring } from "@/types/competition/Scoring";
import { useEntryDB } from "@/db/entry-context";
import { ExactScoreInput } from "./ExactScoreInput";
import { RangeScoreInput } from "./RangeScoreInput";

interface ScorecardProps {
  entryId: string;
  round: Round;
  competition: Competition;
}

const getShotCount = (entry: Entry, target: Target, defaults: TargetDefaults): number => {
  const targetSpecificShots = target.shots?.findLast(
    (ts) =>
      (!ts.division || ts.division === entry.division) &&
      (!ts.ageGroup || ts.ageGroup === entry.ageGroup) &&
      (!ts.gender || ts.gender === entry.gender),
  );

  const defaultShots = defaults.shots.findLast(
    (ts) =>
      (!ts.division || ts.division === entry.division) &&
      (!ts.ageGroup || ts.ageGroup === entry.ageGroup) &&
      (!ts.gender || ts.gender === entry.gender),
  );

  return targetSpecificShots?.shotCount ?? defaultShots?.shotCount ?? 1;
};

//TODO::
const getScoringValues = (target: Target, defaults: TargetDefaults): Scoring =>
  target.scores || defaults.scores;

export const Scorecard = ({ entryId, round, competition }: ScorecardProps) => {
  const { entries, putEntry } = useEntryDB();
  const entry = entries.find((e) => e._id === entryId);

  if (!entry) {
    return null;
  }

  const entryRound = entry.rounds.find((er) => er.roundId === round.id);

  if (!entryRound) {
    throw new Error(`Entry has no EntryRound with id ${round.id}`);
  }

  const { courseId } = entryRound;

  const course = competition.courses.find((c) => c.id === courseId);

  if (!course) {
    throw new Error(`Competition has no Course with id ${courseId}`);
  }

  const { stakes } = course;

  const [selectedStake, setSelectedStake] = useState<Stake>(stakes[0]);
  const [selectedTarget, setSelectedTarget] = useState<Target>(
    course.targets.targetList.find((t) => t.id === stakes[0].targets[0])!,
  );
  const [selectedShot, setSelectedShot] = useState(0);

  const shotsCount = getShotCount(entry, selectedTarget, course.targets.defaults);
  const scoring = getScoringValues(selectedTarget, course.targets.defaults);

  const handleScoreClick = (sv: string) => {
    const updatedEntry = produce(entry, (draft) => {
      const draftEntryRound = draft.rounds.find((r) => r.roundId === round.id);
      const existingHit = draftEntryRound?.hits.find(
        (hit) =>
          hit.stakeId === selectedStake.id &&
          hit.target === selectedTarget.id &&
          hit.shot === selectedShot,
      );

      if (!existingHit) {
        draftEntryRound?.hits.push({
          stakeId: selectedStake.id,
          target: selectedTarget.id,
          shot: selectedShot,
          scoringValueId: sv,
        });
      } else {
        existingHit.scoringValueId = sv;
      }
    });
    putEntry(updatedEntry);
  };

  const handleRangeInput = (value: number) => {
    const updatedEntry = produce(entry, (draft) => {
      const draftEntryRound = draft.rounds.find((r) => r.roundId === round.id);
      const existingHit = draftEntryRound?.hits.find(
        (hit) =>
          hit.stakeId === selectedStake.id &&
          hit.target === selectedTarget.id &&
          hit.shot === selectedShot,
      );

      if (!existingHit) {
        draftEntryRound?.hits.push({
          stakeId: selectedStake.id,
          target: selectedTarget.id,
          shot: selectedShot,
          scoringValue: value,
        });
      } else {
        existingHit.scoringValue = value;
      }
    });
    putEntry(updatedEntry);
  };

  const getHitOfShot = (shot: number) =>
    entry.rounds
      .find((r) => r.roundId === round.id)
      ?.hits.find(
        (h) => h.stakeId === selectedStake.id && h.target === selectedTarget.id && h.shot === shot,
      );

  const getScoringValueOfHit = (shot: number) => getHitOfShot(shot)?.scoringValueId;

  return (
    <div>
      <div>
        <Button
          onClick={() => {
            const currentIndex = stakes.indexOf(selectedStake);
            if (currentIndex === 0) {
              return;
            }

            setSelectedStake(stakes[currentIndex - 1]);
            setSelectedTarget(
              course.targets.targetList.find((t) => t.id === stakes[currentIndex - 1].targets[0])!,
            );
            setSelectedShot(0);
          }}
        >
          -
        </Button>
        {selectedStake.name}
        <Button
          onClick={() => {
            const currentIndex = stakes.indexOf(selectedStake);
            if (currentIndex === stakes.length - 1) {
              return;
            }

            setSelectedStake(stakes[currentIndex + 1]);
            setSelectedTarget(
              course.targets.targetList.find((t) => t.id === stakes[currentIndex + 1].targets[0])!,
            );
            setSelectedShot(0);
          }}
        >
          +
        </Button>
      </div>
      <div>{selectedTarget.name}</div>
      <div className={classes.shots}>
        <Button
          onClick={() => {
            if (selectedShot === 0) {
              return;
            }

            setSelectedShot(selectedShot - 1);
          }}
        >
          -
        </Button>
        {range(shotsCount).map((shot) => (
          <div
            className={clsx({
              [classes.shot]: true,
              [classes.active]: shot === selectedShot,
            })}
          >
            {competition.scoring.find((sc) => sc.id === getScoringValueOfHit(shot))?.label ||
              `#${shot}`}
          </div>
        ))}
        <Button
          onClick={() => {
            if (selectedShot === shotsCount - 1) {
              return;
            }

            setSelectedShot(selectedShot + 1);
          }}
        >
          +
        </Button>
      </div>
      <div>
        {scoring.type === "EXACT" && (
          <ExactScoreInput
            targetScoringValueIds={scoring.scores}
            scoringValues={competition.scoring}
            onClick={handleScoreClick}
          />
        )}
        {scoring.type === "RANGE" && (
          <RangeScoreInput
            key={`${selectedTarget}-${selectedShot}`}
            scoring={scoring}
            value={getHitOfShot(selectedShot)?.scoringValue}
            onChange={handleRangeInput}
          />
        )}
      </div>
    </div>
  );
};
