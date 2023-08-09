import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ cards, forSavedMovies, onSave, onDelete }) {
  
  return (
    <ul className="card-list" aria-label="Галлерея кинофильмов">
      {cards.map((card) => (
        <MoviesCard
          key={card.id}
          saved={card.saved}
          nameEN={card.nameEN}
          nameRU={card.nameRU}
          duration={card.duration}
          snapshot={card.image.url}
          trailer={card.trailerLink}
          forSavedMovies={forSavedMovies}
          onSave={onSave}
          onDelete={onDelete}
        />
      )
      )}
    </ul>
  );
}
