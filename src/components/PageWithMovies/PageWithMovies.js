import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckBox/FilterCheckBox";

export default function PageWithMovies(props) {

  return (
    <div className="page-with-movies">
      <SearchForm onSubmit={props.onSubmit} />
      <FilterCheckbox onClick={props.onFilterClick} />
      {props.children}
    </div>
  );
}
