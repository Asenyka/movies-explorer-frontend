import Button from "../Button/Button";


export default function Form(props) {
 function preventSubmit(e){
e.preventDefault();
return false
 }
 
  return (
    <form
    onSubmit={props.isValid?props.onSubmit:preventSubmit}
      className={`form form_${props.name}`}
      method="get"
      name={props.name}
      noValidate
    >
      <h2 className={`form__heading form__heading_${props.name}`}>
        {props.heading}
      </h2>
      {props.children}
      <Button
        buttonText={props.buttonText}
        type="submit"
        modifier={
          props.isFormButtonInvisible
            ? "form_hidden"
            : 
          props.isValid?`form button_form_${props.name}`:
          `form button_form_${props.name} button_form_inactive`
        }
      />
    </form>
  );
}
