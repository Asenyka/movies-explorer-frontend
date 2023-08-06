import { useState } from "react";
import Form from "../Form/Form";
import Input from "../Input/Input";

export default function SearchForm(props) {
const[searchString, setSearchString] = useState('')
  return (
    <div className="searchform">
      <Form
        heading=""
        name="searchform"
        searchString={searchString}
        onSubmit={props.onSubmit}
        buttonText="Найти"
      >
        <Input
          form="searchform"
          name="search"
          label=""
          id="search"
          type="text"
          placeholder="Ключевое слово"
          onChange={(e) => setSearchString(e.target.value)}
        />
      </Form>
    </div>
  );
}
