import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckBox/FilterCheckBox";

export default function PageWithMovies(props) {

  return (
    <div className="page-with-movies">
      <SearchForm onSearchSubmit={props.onSearchSubmit} forSavedMovies={props.forSavedMovies}/>
      <FilterCheckbox onClick={props.onFilterClick} forSavedMovies={props.forSavedMovies}/>
      {props.children}
    </div>
  );
}
