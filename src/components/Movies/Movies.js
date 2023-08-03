import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Button from "../Button/Button";
import PageWithMovies from "../PageWithMovies/PageWithMovies";
import Preloader from "../Preloader/Preloader";

export default function Movies({ cards }) {
  if (cards.length !== 0) {
    return (
      <section className="movies">
        <PageWithMovies>
          <MoviesCardList cards={cards} forSavedMovies={false} />
        </PageWithMovies>
        <Button buttonText="Ещё" modifier="movies_more" />
      </section>
    );
  } else {
    return (
      <section className="movies">
        <PageWithMovies>
          <Preloader />
        </PageWithMovies>
        <Button buttonText="Ещё" modifier="movies_more" />
      </section>
    );
  }
}
