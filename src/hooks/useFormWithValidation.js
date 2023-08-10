import { useState, useCallback } from "react";

export default function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
 // const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };
console.log(values)
  const resetForm = useCallback(
    (newValues) => {
      setValues(newValues);
      console.log(newValues)
      setErrors({});
      setIsValid(false);
   //   setErrorMessage(errorMessage)
    },
    [setValues, setErrors, setIsValid]
  );
  return {values, handleInputChange, resetForm, errors, isValid};
}
