import { useState, useCallback } from "react";
import {isEmail} from "validator";


export default function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const nameRegExp = new RegExp('^[а-яА-ЯёЁa-zA-Z\s/-]+$');
 
 function validate (name, validity){
  if (name==="name"){
validity.valueMissing?
setErrors({...errors, [name]: "Имя - это обязательное поле"}):
validity.tooShort?
setErrors({...errors, [name]: "В имени должно быть не менее 2 символов"}):
setErrors({...errors, [name]: "Введите корректные данные"})
}
  else if(name==="email"){
    validity.valueMissing?
setErrors({...errors, [name]: "Email - это обязательное поле"}):
validity.typeMismatch?
setErrors({...errors, [name]: "Введите корректный email. Например, example@example.ru"}):
setErrors({...errors, [name]: "Введите корректные данные"})
  }
  else if(name==="password"){
    validity.valueMissing?
    setErrors({...errors, [name]: "Пароль - это обязательное поле"}):
    validity.tooShort?
    setErrors({...errors, [name]: "В пароле должно быть не менее 4 символов"}):
    setErrors({...errors, [name]: "Введите корректные данные"})
  }
  else if(name==="searchField"){
    validity.valueMissing?
    setErrors({...errors, [name]: "Для поиска нужно ввести ключевое слово"}):
    setErrors({...errors, [name]: "Введите корректные данные"})
  }
 }
  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const validity = target.validity;
    setValues({ ...values, [name]: value });
    if(!validity.valid){
    validate(name, validity)
  }else{
      if(name==="name"&&!nameRegExp.test(value))
      {setErrors({...errors, [name]: "Имя может содержать только буквы, пробел и дефис"})}
      else if(name==="email"&&!isEmail(value))
      {setErrors({...errors, [name]: "Введите корректный email. Например, example@example.ru"})}
      else{
    setErrors({...errors, [name]:""})
    setIsFormValid(target.closest("form").checkValidity());
    }
  }
}
  const resetForm = useCallback(
    (newValues) => {
      setValues(newValues);
      setErrors({});
      setIsFormValid(false);
    },
    [setValues, setErrors, setIsFormValid]
  );

  return {
    values,
    handleInputChange,
    resetForm,
    isFormValid,
    errors
    
  };
}
