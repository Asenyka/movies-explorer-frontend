import { useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import Form from "../Form/Form";
import Input from "../Input/Input";

export default function SearchForm(props) {
const searchedString = localStorage.getItem("searchString");
const {values, handleInputChange, resetForm, errors, isValid} = useFormWithValidation();
  useEffect(()=>{
    resetForm(searchedString)
  }, [resetForm, searchedString])

 function  handleSearch(e){
e.preventDefault();
props.onSearchSubmit(values.search)
}
  return (
    <div className="searchform">
      <Form
        heading=""
        name="searchform"
        onSubmit={handleSearch}
        buttonText="Найти"
        isValid={isValid}
      >
        <Input
          form="searchform"
          name="search"
          label=""
          id="search"
          type="text"
          placeholder="Ключевое слово"
          value={values?values.search:""}
          onChange={handleInputChange}
          errors={errors}
        />
      </Form>
    </div>
  );
}
