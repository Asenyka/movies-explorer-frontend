import MoviesCardList from "../MoviesCardList/MoviesCardList";
import PageWithMovies from "../PageWithMovies/PageWithMovies";
import Preloader from "../Preloader/Preloader";
import SearchTip from "../SearchTip/SearchTip";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function SavedMovies({
  cards,
  onFilterClick,
  onCardDelete,
  onSearchSubmit,
  onSearch,
  tipText
}) {
  const currentUser = useContext(CurrentUserContext);
  const cardsToShow = cards.filter((el) => el.owner === currentUser._id);
  if (cards.length !== 0) {
    return (
      <section className="saved-movies">
        <PageWithMovies
          onFilterClick={onFilterClick}
          onSearchSubmit={onSearchSubmit}
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
        <PageWithMovies onFilterClick={onFilterClick}
          onSearchSubmit={onSearchSubmit}
          forSavedMovies={true}>
           {onSearch === false ? <Preloader /> : <SearchTip tipText={tipText} />}
        </PageWithMovies>
      </section>
    );
  }
}
