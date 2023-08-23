import MoviesCardList from "../MoviesCardList/MoviesCardList";
import PageWithMovies from "../PageWithMovies/PageWithMovies";
import SearchTip from "../SearchTip/SearchTip";

import { useEffect, useState } from "react";

export default function SavedMovies({
  cards,
  onCardDelete,
  filterItems,
  filterDuration
}) {  
  
  const [savedSearchString, setSavedSearchString] = useState("");
  const [filterState, setFilterState] =useState(false);
  const [cardsToShow, setCardsToShow] = useState([]);
  const [tipText, setTipText] =useState("");
  const [onSearch, setOnSearch] =useState(false);
 
useEffect(()=>{
  if(savedSearchString){
    const searchedCards = filterItems(cards, savedSearchString);
    setCardsToShow(searchedCards)
  }else{
  setCardsToShow(cards)}
},[cards])
 
  function handleFilterClick(state) {
    setOnSearch(true);
    setFilterState(state);
    const searchedCards = filterItems(cards, savedSearchString);
      if (state===true) {
        const filteredCards = filterDuration(cardsToShow);
        setCardsToShow(filteredCards);
      } else {
        setCardsToShow(searchedCards);
      }
  }
    
  function handleSearchSubmit(string) {
       setSavedSearchString(string);
    const newCards = filterItems(cards, string);
    if (filterState===true) {
      const shortFilms = filterDuration(newCards);
      if (shortFilms.length !== 0) {
        setCardsToShow(shortFilms);
       
      } else {
        setCardsToShow([])
        setOnSearch(true)
        setTipText("Ничего не найдено");
        
      }
    } else {
      if (newCards.length !== 0) {
        setCardsToShow(newCards);
        
      } else {
        setCardsToShow([])
        setOnSearch(true)
        setTipText("Ничего не найдено");
        
      }
    }
  }
 
  if (cardsToShow.length !== 0) {
    return (
      <section className="saved-movies">
        <PageWithMovies
          onFilterClick={handleFilterClick}
          onSearchSubmit={handleSearchSubmit}
          forSavedMovies={true}
        >
          <MoviesCardList
            cards={cardsToShow}
            forSavedMovies={true}
            onCardDelete={onCardDelete}
          />
        </PageWithMovies>
      </section>
    );
  } else {
    return (
      <section className="saved-movies">
        <PageWithMovies onFilterClick={handleFilterClick}
          onSearchSubmit={handleSearchSubmit}
          forSavedMovies={true}>
           {onSearch?<SearchTip tipText={tipText} />:<SearchTip tipText={"Вы ещё не сохранили ни одного фильма"} />}
        </PageWithMovies>
      </section>
    );
  }
}
