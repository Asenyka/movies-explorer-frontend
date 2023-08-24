import saved from "../../images/saved.svg";
import notSaved from "../../images/not-saved.svg";
import cardDelete from "../../images/card_delete.svg";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function MoviesCard(props) {
  const currentUser = useContext(CurrentUserContext);
  const [isCardSaved, setIsCardSaved] = useState(false);

  useEffect(() => {
    if (props.owner) {
      setIsCardSaved(true);
    } else {
      setIsCardSaved(false);
    }
  }, [props, currentUser]);
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  function toHoursAndMinutes(min) {
    const m = min % 60;
    const h = Math.floor(min / 60);
    return `${padTo2Digits(h)} ч ${padTo2Digits(m)} м`;
  }
  function toggleButtonState() {
    if (isCardSaved) {
      props.onDelete(props.api_id);
    } else {
      props.onSave(props.id);
    }
  }
  function deleteCard() {
    props.onDelete(props.api_id);
  }

  return (
    <li className="card">
      <div className="card__info">
        <Link className="link link_card" to={props.trailer} target="_blank">
          {" "}
          <h2 className="card__heading">{props.nameRU}</h2>
        </Link>
        {props.forSavedMovies ? (
          <Button
            modifier="saved-movies"
            buttonText={
              <img
                className="card__btn"
                alt="Кнопка удаления фильма из сохраненных"
                src={cardDelete}
              />
            }
            onClick={deleteCard}
          />
        ) : (
          <Button
            modifier="movies"
            buttonText={
              <img
                className="card__btn"
                alt="Кнопка сохранения фильма"
                src={isCardSaved ? saved : notSaved}
              />
            }
            onClick={toggleButtonState}
          />
        )}
        <span className="card__duration">
          {toHoursAndMinutes(props.duration)}
        </span>
      </div>
      <Link className="link link_card" to={props.trailer} target="_blank">
        <img
          className="card__snapshot"
          src={props.snapshot}
          alt={`Иллюстрация к фильму "${props.nameRU}"`}
        />
      </Link>
    </li>
  );
}
