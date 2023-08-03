import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckBox/FilterCheckBox";

export default function PageWithMovies(props) {
  return (
    <div className="page-with-movies">
      <SearchForm />
      <FilterCheckbox />
      {props.children}
    </div>
  );
}
