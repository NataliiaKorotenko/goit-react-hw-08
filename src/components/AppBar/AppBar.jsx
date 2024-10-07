import { useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import css from "../AppBar/AppBar.module.css";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";
import { UserMenu } from "../UserMenu/UserMenu";
import { AuthNav } from "../AuthNav/AuthNav";


export default function AppBar () {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  return(
    <header  className={css.header}>
    <Navigation />
    {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  )
}