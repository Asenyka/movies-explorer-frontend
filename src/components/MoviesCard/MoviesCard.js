import saved from "../../images/saved.svg";
import notSaved from "../../images/not-saved.svg";
import cardDelete from "../../images/card_delete.svg";
import { useState, useContext, useEffect} from "react";
import Button from "../Button/Button";
import CurrentUserContext from "../../contexts/CurrentUserContext";

  

export default function MoviesCard(props) {
  const currentUser = useContext(CurrentUserContext);
  const [isCardSaved, setIsCardSaved] = useState(false);
useEffect(()=>{
  if(currentUser._id===props.owner&&props.owner!==undefined){setIsCardSaved(true)}
}, [props, currentUser]
)
function toggleButtonState() {
   if(isCardSaved){ 
    props.onDelete(props.api_id)
   
 } else{
 props.onSave(props.id)
 
}
 }

 
  return (
    <li className="card">
      <div className="card__info">
        <h2 className="card__heading">{props.nameRU}</h2>
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
            onClick={props.onDelete}
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
        alt={`Иллюстрация к фильму "${props.nameRU}"`}
      />
    </li>
  );
}
