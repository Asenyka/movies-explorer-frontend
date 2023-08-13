import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ cards, forSavedMovies, onCardSave }) {
  
  return (
    <ul className="card-list" aria-label="Галлерея кинофильмов">
      {cards.map((card) => (
          <MoviesCard
          key={card.movieId}
          id={card.movieId}
          owner={card.owner}
          nameEN={card.nameEN}
          nameRU={card.nameRU}
          duration={card.duration}
          snapshot={card.image}
          trailer={card.trailerLink}
          forSavedMovies={forSavedMovies}
          onSave={onCardSave}
        />
      )
      )}
    </ul>
  );
}
