import saved from "../../images/saved.svg";
import notSaved from "../../images/not-saved.svg";
import cardDelete from "../../images/card_delete.svg";
import { useState } from "react";
import Button from "../Button/Button";

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
          <Button
            modifier="saved-movies"
            buttonText={
              <img
                className="card__btn"
                alt="Кнопка удаления фильма из сохраненных"
                src={cardDelete}
              />
            }
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
