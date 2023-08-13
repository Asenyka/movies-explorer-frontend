import { useState, useCallback } from "react";

export default function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
 const handleError=(validityStatus)=>{
  validityStatus==="patternMissmatch"?setErrorMessage("Введите корректный E-mail"):setErrorMessage("")
 }
  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    console.log(value)
    console.log(name)
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues) => {
      setValues(newValues);
      setErrors({});
      setIsValid(false);
   //   setErrorMessage(errorMessage)
    },
    [setValues, setErrors, setIsValid]
  );
  return {values, handleInputChange, resetForm, errors, isValid};
}
