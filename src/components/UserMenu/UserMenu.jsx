import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";
import { selectUser } from "../../redux/auth/selectors";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      dispatch(logOut());
    }
  };

  return (
    <div className={css.userMenu}>
      <p className={css.userText}>Welcome, {user.name}</p>
      <button
        className={css.button}
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};
