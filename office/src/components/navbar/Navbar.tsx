import { Code, Group, Text } from "@mantine/core";
import { IconList, IconLogout, IconTrophy } from "@tabler/icons-react";
import { t } from "i18next";
import classes from "./Navbar.module.css";
import { NavbarItem } from "./NavbarItem";
import { CompetitionNavbar } from "./CompetitionNavbar";

export const Navbar = () => (
  <nav className={classes.navbar}>
    <div className={classes.navbarMain}>
      <Group className={classes.header} justify="space-between">
        <Text size="xl" fw={700}>
          Altenz
        </Text>
        <Code fw={700}>v1.0.0</Code>
      </Group>

      <div className={classes.group}>
        <NavbarItem link="/" label={t("menu.competitions")} icon={IconList} />
        <NavbarItem link="/tournaments" label={t("menu.tournaments")} icon={IconTrophy} />
      </div>

      <CompetitionNavbar />
    </div>

    <div className={classes.footer}>
      <NavbarItem link="/logout" label="Logout" icon={IconLogout} />
    </div>
  </nav>
);
