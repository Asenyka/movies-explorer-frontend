import logo from "../../images/logo.png";
import Button from "../Button/Button";
import navpic from "../../images/navpic.png";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="header">
      <Link className="link" to="/">
        <img src={logo} className="header__logo" alt="logo" />
      </Link>
      <Button
        buttonText={<img src={navpic} alt="Пиктограмма навигации" />}
        modifier={`header-nav ${
          props.loggedIn ? "button_header-nav_open" : ""
        }`}
        onClick={props.onOpenNavigation}
      />
      <div
        className={`header__nav-links-block ${
          props.loggedIn ? "header__nav-links-block_open" : ""
        }`}
      >
        <ul className="header__nav-links">
          <li className="header__nav-link">
            <Link className="link link_header-nav" to="/movies">
              Фильмы
            </Link>
          </li>
          <li className="header__nav-link">
            <Link className="link link_header-nav" to="/saved-movies">
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link className="link link_to-profile" to="/profile">
          Аккаунт
        </Link>
      </div>
      <div
        className={`header__auth-links-block ${
          props.loggedIn ? "" : "header__auth-links-block_open"
        }`}
      >
        <Link className="link link_header-auth" to="/signup">
          Регистрация
        </Link>
        <Link
          className="link link_header-auth link_header-auth_login"
          to="/signin"
        >
          Войти
        </Link>
      </div>
    </header>
  );
}
