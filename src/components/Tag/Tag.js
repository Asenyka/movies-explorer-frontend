export default function Tag(props) {
  return <h2 className={`tag tag_${props.modifier}`}>{props.text}</h2>;
}
