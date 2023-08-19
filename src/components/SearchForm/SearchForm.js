import { useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import Form from "../Form/Form";
import Input from "../Input/Input";

export default function SearchForm(props) {
const searchedString = localStorage.getItem("searchString");
const {values, handleInputChange, resetForm, errorMessage, isFormValid } = useFormWithValidation();

  useEffect(()=>{
    resetForm(props.forSavedMovies?{}:{searchField:searchedString})
  
  }, [])

 function  handleSearch(e){
e.preventDefault();
props.onSearchSubmit(values.searchField)
}
  return (
    <div className="searchform">
      <Form
        heading=""
        name="searchform"
        onSubmit={handleSearch}
        buttonText="Найти"
        isValid={isFormValid}
      >
        <Input
          form="searchform"
          name="searchField"
          label=""
          id="search"
          type="text"
          placeholder="Ключевое слово"
          value={values.searchField||''}
          onChange={handleInputChange}
          error={errorMessage}
          
        />
      </Form>
    </div>
  );
}
