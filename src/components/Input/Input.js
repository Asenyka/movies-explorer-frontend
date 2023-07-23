export default function Input(props) {
  return (
    <div
      className={`input input_${props.form} input_${props.form}_${props.name}`}
    >
      <label
        className={`input__label  input__label_${props.form} input__label_${props.form}_${props.name}`}
      >
        {props.label}
        <input
          className={`input__field  input__field_${props.form} input__field_${props.form}_${props.name}`}
          id={props.id}
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          required
        />
      </label>
      <span
        className={`input__error  input__error_${props.form} input__error_${props.form}_${props.name}`}
      ></span>
    </div>
  );
}
