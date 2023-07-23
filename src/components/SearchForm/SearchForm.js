import Form from "../Form/Form";
import Input from "../Input/Input";
export default function SearchForm() {
  function handleSubmit() {
    console.log("submit");
  }
  return (
    <div className="searchform">
      <Form
        heading=""
        name="searchform"
        onSubmit={handleSubmit}
        buttonText="Найти"
      >
        <Input
          form="searchform"
          name="search"
          label=""
          id="search"
          type="text"
          placeholder="Фильм"
        />
      </Form>
    </div>
  );
}
