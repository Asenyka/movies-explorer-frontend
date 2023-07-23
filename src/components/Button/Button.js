export default function Button(props) {
  return (
    <button
      className={`button button_${props.modifier}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.buttonText}
    </button>
  );
}
