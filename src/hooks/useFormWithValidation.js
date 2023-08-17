import { useState, useCallback } from "react";

export default function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
 
  const [ inputName, setInputName] = useState("");
  const handleError = () => {
    const validityState = errors[inputName];
    validityState.valueMissing
      ? setErrorMessage("Необходимо ввести значение")
      : (inputName === "name"&&validityState.tooShort)
      ? setErrorMessage("Имя должно содержать не менее 2 знаков")
      : (inputName === "password"&&validityState.tooShort)
      ? setErrorMessage("Пароль должен содержать не менее 4 знаков")
      :  (inputName === "name"&&validityState.tooLong)
      ? setErrorMessage("Имя должно содержать не более 32 знаков")
      : (inputName === "name"&&validityState.patternMismatch)
      ? setErrorMessage("Имя может содержать только буквы, пробелы и дефисы")
      : (inputName === "email"&&validityState.typeMismatch)
      ? setErrorMessage("Введите корректный E-mail")
      : setErrorMessage(inputName.validationMessage);
  };
  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setInputName(name);
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validity });
    if (!target.validity.valid) {
      handleError();
    }
    setIsFormValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues) => {
      setValues(newValues);
      setErrors({});
      setIsFormValid(false);
      setErrorMessage("")
    },
    [setValues, setErrors, setIsFormValid]
  );

  return {
    values,
    handleInputChange,
    resetForm,
    isFormValid,
    handleError,
    errorMessage,
    
  };
}
