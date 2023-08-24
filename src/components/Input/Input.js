
export default function Input({label, minLength, maxLength, disabled, id, type, name, placeholder, form, value, onChange, error, pattern}) {

  return (
    <div
      className={`input input_${form} input_${form}_${name}`}
    >
      <label
        className={`input__label  input__label_${form} input__label_${form}_${name}`}
      >
        {label}
        <input
          className={`input__field  input__field_${form} input__field_${form}_${name}`}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value||""}
          onChange={onChange}
          required
          disabled={disabled}
          minLength={minLength}
          maxLength={maxLength}
          autoComplete="new-password"

        />
      </label>
      <span
        className={`input__error  input__error_${form} input__error_${form}_${name}`}
      >{error}</span>
    </div>
  );
}
