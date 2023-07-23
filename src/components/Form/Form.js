import Button from "../Button/Button";
export default function Form(props) {
  return (
    <form
      className={`form form_${props.name}`}
      method="get"
      name={props.name}
      onSubmit={props.onSubmit}
    >
      <h2 className={`form__heading form__heading_${props.name}`}>
        {props.heading}
      </h2>
      {props.children}
      <Button
        buttonText={props.buttonText}
        type="submit"
        modifier={
          props.isFormButtonActive
            ? `form button_form_${props.name}`
            : "form_inactive"
        }
      />
    </form>
  );
}
