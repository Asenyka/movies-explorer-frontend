import MoviesCardList from "../MoviesCardList/MoviesCardList";
import PageWithMovies from "../PageWithMovies/PageWithMovies";
import Preloader from "../Preloader/Preloader";

export default function SavedMovies({ cards, loggedIn, onFilterClick, onCardDelete, onSearchSubmit}) {

  if (cards.length !== 0) {
    return (
      <section className="saved-movies">
        <PageWithMovies onFilterClick={onFilterClick} onSearchSubmit={onSearchSubmit} forSavedMovies={true}>
          <MoviesCardList cards={cards} forSavedMovies={true} onCardDelete={onCardDelete}/>
        </PageWithMovies>
      </section>
    );
  } else {
    return (
      <section className="saved-movies">
        <PageWithMovies>
          <Preloader />
        </PageWithMovies>
      </section>
    );
  }
}
