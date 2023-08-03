import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import Input from "../Input/Input";
import PageWithForm from "../PageWithForm/PageWithForm";

export default function Register(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  function handleEmailInputState(e) {
    setEmail(e.target.value);
  }
  function handleNameInputState(e){
    setName(e.target.value);
  }
  function handlePasswordInputState(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({ email: email, password: password, name: name});
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
      >
        <Input
          form="register"
          name="name"
          type="text"
          placeholder="Имя"
          label="Имя"
          onChange={handleNameInputState}
        />
        <Input
          form="register"
          name="email"
          type="email"
          placeholder="E-mail"
          label="E-mail"
          onChange={handleEmailInputState}
        />
        <Input
          form="register"
          name="password"
          type="password"
          placeholder="Пароль"
          label="Пароль"
          onChange={handlePasswordInputState}
        />
      </Form>
    </PageWithForm>
  );
}
