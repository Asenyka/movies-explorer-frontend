export default function Button(props) {
  return (
    <button
      className={`button button_${props.modifier}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.buttonText}
    </button>
  );
}
