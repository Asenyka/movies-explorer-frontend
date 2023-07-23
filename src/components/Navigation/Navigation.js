import Button from "../Button/Button";
import cross from "../../images/cross.png";

import { Link } from "react-router-dom";
export default function Navigation(props) {
  return (
    <div className={`navigation ${props.isOpen ? "navigation_opened" : ""}`}>
      <div className="navigation__block">
        <Button
          buttonText={<img src={cross} alt="Пиктограмма крестика" />}
          modifier="close_navigation"
          onClick={props.onClose}
        />

        <ul className="navigation__links-block">
          <li className="navigation__item">
            <Link
              className="link link_navigation"
              to="/"
              onClick={props.onClose}
            >
              Главная
            </Link>
          </li>
          <li className="navigation__item">
            <Link
              className="link link_navigation"
              to="/movies"
              onClick={props.onClose}
            >
              Фильмы
            </Link>
          </li>
          <li className="navigation__item">
            <Link
              className="link link_navigation"
              to="/saved-movies"
              onClick={props.onClose}
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link
          className="link link_to-profile"
          to="/profile"
          onClick={props.onClose}
        >
          Аккаунт
        </Link>
      </div>
    </div>
  );
}
