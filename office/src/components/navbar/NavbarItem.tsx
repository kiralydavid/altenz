import { NavLink } from "react-router-dom";
import classes from "./NavbarItem.module.css";
import { TablerIcon } from "@tabler/icons-react";

export const NavbarItem = ({
  link,
  label,
  nested,
  ...rest
}: {
  link: string;
  label: string;
  nested?: boolean;
  icon?: TablerIcon;
}) => (
  <NavLink
    className={({ isActive }) =>
      `${classes.link} ${nested ? classes.nested : ""} ${isActive ? `${classes.active}` : ""}`
    }
    to={link}
    key={label}
  >
    {rest.icon && <rest.icon className={classes.linkIcon} stroke={1.5} />}
    <span>{label}</span>
  </NavLink>
);
