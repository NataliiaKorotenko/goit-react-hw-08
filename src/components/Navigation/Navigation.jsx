import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";
import css from '../Navigation/Navigation.module.css';

export default function Navigation() {
    const isLoggedIn = useSelector(selectAuthIsLoggedIn);
    return (
            <nav className={css.nav}>
                <ul className={css.navList}>
                    <li className={css.navItem}>
                        <NavLink to="/" className={css.navLink}>
                        Home
                        </NavLink>
                    </li>
                    <li className={css.navItem}>
                    {isLoggedIn && (
                        <NavLink to="/contacts" className={css.navLink}>
                        Contacts
                        </NavLink>
                        )}
                    </li>
                </ul>
            </nav>
    );
}