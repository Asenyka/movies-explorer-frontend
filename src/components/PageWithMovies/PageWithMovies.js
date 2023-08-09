import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckBox/FilterCheckBox";

export default function PageWithMovies(props) {

  return (
    <div className="page-with-movies">
      <SearchForm onSearchSubmit={props.onSearchSubmit} />
      <FilterCheckbox onClick={props.onFilterClick} />
      {props.children}
    </div>
  );
}
