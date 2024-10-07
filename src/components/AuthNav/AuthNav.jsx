import { NavLink } from "react-router-dom";
import css from "../AuthNav/AuthNav.module.css";

export const AuthNav = () => {
  return (
  <nav className={css.nav}>
    <div className={css.navList}>
      <NavLink className={css.navLink} to="/register">
        Register
      </NavLink>
      <NavLink className={css.navLink} to="/login">
        Log In
      </NavLink>
    </div>
  </nav>
  );
};