import { useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";
//import { Link } from "react-router-dom";
import Form from "../Form/Form";
import Input from "../Input/Input";
import PageWithForm from "../PageWithForm/PageWithForm";

export default function Register(props) {
  const {values, handleInputChange, resetForm, errors, isValid} = useFormWithValidation();
  useEffect(()=>{
    resetForm({})
  }, [resetForm])

    function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({ email: values.email, password: values.password, name: values.name});
  }
  return (
   
    <PageWithForm
      question="Уже зарегистрированы?"
      linkTo="/register"
      linkText="Войти"
      modifier="register"
    >
      <Form
        name="register"
        onSubmit={handleSubmit}
        buttonText="Зарегистрироваться"
        heading="Добро пожаловать!"
        isValid={isValid} 
      >
        <Input
          form="register"
          name="name"
          type="text"
          placeholder="Имя"
          label="Имя"
          onChange={handleInputChange}
          errors={errors}
          pattern='^[A-Za-zU+0400–U+04FF -]+$'
          minLength={2}
          maxLength={32}
        />
        <Input
          form="register"
          name="email"
          type="email"
          placeholder="E-mail"
          label="E-mail"
          onChange={handleInputChange}
          errors={errors}
        />
        <Input
          form="register"
          name="password"
          type="password"
          placeholder="Пароль"
          label="Пароль"
          onChange={handleInputChange}
          errors={errors}
          minLength={4}
        />
      </Form>
    </PageWithForm>
  );
}
