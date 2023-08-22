import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Button from "../Button/Button";
import PageWithMovies from "../PageWithMovies/PageWithMovies";
import Preloader from "../Preloader/Preloader";
import SearchTip from "../SearchTip/SearchTip";
import { useState, useEffect } from "react";

export default function Movies({
  cards,
  onSearch,
  onSearchSubmit,
  onFilterClick,
  tipText,
  onCardSave,
  onCardDelete,
  isSearching
}) {
  const [cardsToShow, setCardsToShow] = useState([]);
  const [cardsTotal, setCardsTotal] = useState([])
  const windowWidth = window.innerWidth;
  const cardNumber = windowWidth < 480 ? 5 : windowWidth < 1280 ? 8 : 12;
  const additionalCardNumber = windowWidth < 1280 ? 2 : 3;
  const searchedCards = localStorage.getItem("searchedCards");


  useEffect(() => {
    if (cards.length!==0) {
      setCardsToShow(cards.slice(0, cardNumber));
     setCardsTotal(cards);
    } else {
      const previousCards = JSON.parse(searchedCards);
      if (previousCards){
      setCardsToShow(previousCards.slice(0, cardNumber));
     setCardsTotal(previousCards);
    }}
  }, [cards, cardNumber, searchedCards]);

  function moreOnClick() {
    const newCardNumber = cardsToShow.length + additionalCardNumber;
    setCardsToShow(cardsTotal.slice(0, newCardNumber));
  }
  if(isSearching){
    return (
      <section className="movies">
        <PageWithMovies onSearchSubmit={onSearchSubmit} onFilterClick={onFilterClick}>
         <Preloader />
        </PageWithMovies>
      </section>
    );
  }

  if (cardsToShow.length !==0) {
    return (
      <section className="movies">
        <PageWithMovies onSearchSubmit={onSearchSubmit} onFilterClick={onFilterClick}>
          <MoviesCardList cards={cardsToShow} forSavedMovies={false} onCardSave={onCardSave} onCardDelete={onCardDelete}/>
        </PageWithMovies>
        {cardsToShow.length < cardsTotal.length ? (
          <Button
            buttonText="Ещё"
            modifier="movies_more"
            type="button"
            onClick={moreOnClick}
          />
        ) : (
          ""
        )}
      </section>
    );
  } else {
    return (
      <section className="movies">
        <PageWithMovies onSearchSubmit={onSearchSubmit} onFilterClick={onFilterClick}>
         {onSearch?<SearchTip tipText={tipText}/>:<SearchTip tipText="Введите запрос для поска фильма"/>}
        </PageWithMovies>
      </section>
    );
  }
}
