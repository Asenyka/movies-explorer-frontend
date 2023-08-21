import { useEffect, useState } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";
//import { Link } from "react-router-dom";
import Form from "../Form/Form";
import Input from "../Input/Input";
import PageWithForm from "../PageWithForm/PageWithForm";

export default function Register(props) {
  const [isDisabled, setIsDisabled] =useState(false);
  const {values, handleInputChange, resetForm, errors, isFormValid} = useFormWithValidation();
  useEffect(()=>{
    resetForm({})
  }, [resetForm])

    function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({ email: values.email, password: values.password, name: values.name});
    setIsDisabled(true);
  }
  return (
   
    <PageWithForm
      question="Уже зарегистрированы?"
      linkTo="/signin"
      linkText="Войти"
      modifier="register"
    >
      <Form
        name="register"
        onSubmit={handleSubmit}
        buttonText="Зарегистрироваться"
        heading="Добро пожаловать!"
        isValid={isFormValid} 
      >
        <Input
        disabled={isDisabled}
          form="register"
          name="name"
          type="text"
          placeholder="Имя"
          label="Имя"
          value={values.name||""}
          onChange={handleInputChange}
          error={errors.name}
          minLength={2}
          maxLength={32}
        />
        <Input
         disabled={isDisabled}
          form="register"
          name="email"
          type="email"
          placeholder="E-mail"
          label="E-mail"
          onChange={handleInputChange}
          value={values.email||""}
          error={errors.email}
      
        />
        <Input
         disabled={isDisabled}
          form="register"
          name="password"
          type="password"
          placeholder="Пароль"
          label="Пароль"
          onChange={handleInputChange}
          value={values.password||""}
          error={errors.password}
          minLength={4}
        
        />
      </Form>
    </PageWithForm>
  );
}
