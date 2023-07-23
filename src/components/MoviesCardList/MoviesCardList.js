import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ cards, forSavedMovies }) {
  return (
    <ul className="card-list" aria-label="Галлерея кинофильмов">
      {cards.map((card) => (
        <MoviesCard
          key={card.id}
          saved={card.saved}
          name={card.name}
          duration={card.duration}
          snapshot={card.snapshot}
          forSavedMovies={forSavedMovies}
        />
      ))}
    </ul>
  );
}
