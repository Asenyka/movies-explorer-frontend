import saved from "../../images/saved.png";
import notSaved from "../../images/not-saved.png";
import cardDelete from "../../images/card_delete.png";
import { useState } from "react";

export default function MoviesCard(props) {
  const [isCardSaved, setIsCardSaved] = useState(props.saved);
  function toggleButtonState() {
    isCardSaved ? setIsCardSaved(false) : setIsCardSaved(true);
  }
  return (
    <div className="card">
      <div className="card__info">
        <h2 className="card__heading">{props.name}</h2>
        {props.forSavedMovies ? (
          <img
            className="card__btn"
            alt="Кнопка удаления фильма из сохраненных"
            src={cardDelete}
          />
        ) : (
          <img
            className="card__btn"
            alt="Кнопка сохранения фильма"
            src={isCardSaved ? saved : notSaved}
            onClick={toggleButtonState}
          />
        )}
        <span className="card__duration">{props.duration}</span>
      </div>
      <img
        className="card__snapshot"
        src={props.snapshot}
        alt={`Иллюстрация к фильму "${props.name}"`}
      />
    </div>
  );
}
