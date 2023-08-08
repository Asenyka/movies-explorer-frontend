import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Button from "../Button/Button";
import PageWithMovies from "../PageWithMovies/PageWithMovies";
import Preloader from "../Preloader/Preloader";
import SearchTip from "../SearchTip/SearchTip";
import { useState } from "react";

export default function Movies(props) {
  const cards = props.cards;
  const windowWidth = window.innerWidth;
  const cardNumber= windowWidth<480?5:windowWidth<1280?8:12;
  const initialCards = cards.slice(0, cardNumber);
  console.log(initialCards)
  const [cardsToShow, setCardsToShow] = useState(initialCards)
  function moreOnClick(){
    const newCardNumber = cardsToShow.length+cardNumber;
    setCardsToShow(cards.slice(0,newCardNumber))
  }
  if (cards.length !== 0) {
    return (
      <section className="movies">
        <PageWithMovies onSubmit={props.onSubmit} onFilterClick={props.onFilterClick}>
         <MoviesCardList cards={cardsToShow} forSavedMovies={false}/>
        </PageWithMovies>
        <Button buttonText="Ещё" modifier="movies_more" />
      </section>
    );
  } else {
    return (
      <section className="movies">
        <PageWithMovies onSubmit={props.onSubmit} onFilterClick={props.onFilterClick}>
          {props.onSearch===false?<Preloader />:<SearchTip tipText={props.tipText}/>}
        </PageWithMovies>
        <Button buttonText="Ещё" modifier="movies_more" onClick={moreOnClick}/>
      </section>
    );
  }
}
