import MoviesCardList from "../MoviesCardList/MoviesCardList";
import PageWithMovies from "../PageWithMovies/PageWithMovies";
import Preloader from "../Preloader/Preloader";

export default function SavedMovies({ cards }) {
  if (cards.length !== 0) {
    return (
      <section className="saved-movies">
        <PageWithMovies>
          <MoviesCardList cards={cards} forSavedMovies={true} />
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
