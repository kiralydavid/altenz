import {
  Icon123,
  IconCalendar,
  IconSettings,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Text } from "@mantine/core";
import { t } from "i18next";
import { NavbarItem } from "./NavbarItem";
import { useCompetitionDB } from "@/db/competition-context";

export const CompetitionNavbar = () => {
  const { competition } = useCompetitionDB();

  if (!competition) {
    return null;
  }

  return (
    <>
      <Text size="sm" fw="500" truncate="end" pb="xs">
        {competition.name}
      </Text>
      <NavbarItem
        link={`/c/${competition._id}/settings`}
        label={t("menu.settings")}
        icon={IconSettings}
      />

      <NavbarItem
        link={`/c/${competition._id}/athletes`}
        label={t("menu.athletes")}
        icon={IconUsers}
      />

      <NavbarItem
        link={`/c/${competition._id}/teams`}
        label={t("menu.teams")}
        icon={IconUsersGroup}
      />

      <NavbarItem
        link={`/c/${competition._id}/rounds`}
        label={t("menu.rounds")}
        icon={IconCalendar}
      />

      {competition.rounds.map((round) => (
        <NavbarItem
          key={`round_${round.id}`}
          link={`/c/${competition._id}/r/${round.id}`}
          label={round.name}
          nested
        />
      ))}

      <NavbarItem link={`/c/${competition._id}/results`} label={t("menu.results")} icon={Icon123} />
    </>
  );
};
