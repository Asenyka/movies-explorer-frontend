import MoviesCardList from "../MoviesCardList/MoviesCardList";
import PageWithMovies from "../PageWithMovies/PageWithMovies";
import Preloader from "../Preloader/Preloader";
import SearchTip from "../SearchTip/SearchTip";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";

export default function SavedMovies({
  cards,
  onCardDelete,
  filterItems,
  filterDuration
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isSearching, setIsSearching] =useState(false)
  const [ownCards, setOwnCards] =useState([]);
  const [savedSearchString, setSavedSearchString] = useState("");
  const [filterState, setFilterState] =useState('');
  const [cardsToShow, setCardsToShow] = useState([]);
  const [tipText, setTipText] =useState("");
  const [onSearch, setOnSearch] =useState(false)
 useEffect(()=>{
  const filteredCards=cards.filter((el) => el.owner === currentUser._id);
  setOwnCards(filteredCards)
  setCardsToShow(filteredCards)
 }, [cards, currentUser._id])
 
  function handleFilterClick(state) {
    setOnSearch(true);
    setFilterState(state);
     const searchedCards = filterItems(ownCards, savedSearchString);
      if (state) {
        const filteredCards = filterDuration(searchedCards);
        setCardsToShow(filteredCards);
      } else {
        setCardsToShow(searchedCards);
      }
  }
    
  function handleSearchSubmit(string) {
     setIsSearching(true);
       setSavedSearchString(string);
    const newCards = filterItems(ownCards, string);
    if (filterState) {
      const shortFilms = filterDuration(newCards);
      if (shortFilms.length !== 0) {
        setCardsToShow(shortFilms);
        setIsSearching(false);
      } else {
        setCardsToShow([])
        setOnSearch(true)
        setTipText("Ничего не найдено");
        setIsSearching(false);
      }
    } else {
      if (newCards.length !== 0) {
        setCardsToShow(newCards);
        setIsSearching(false);
      } else {
        setCardsToShow([])
        setOnSearch(true)
        setTipText("Ничего не найдено");
        setIsSearching(false);
      }
    }
  }
if(isSearching){
  return (
    <section className="saved-movies">
      <PageWithMovies onFilterClick={handleFilterClick}
        onSearchSubmit={handleSearchSubmit}
        forSavedMovies={true}>
       <Preloader /> 
      </PageWithMovies>
    </section>
  );
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
