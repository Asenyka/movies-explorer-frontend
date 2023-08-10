import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Form/Form";
import Input from "../Input/Input";
import PageWithForm from "../PageWithForm/PageWithForm";


export default function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  function handleEmailInputState(e) {
    setEmail(e.target.value);
  }
  function handlePasswordInputState(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({ password: password, email: email });
    navigate("/movies", { replace: true });
  }
  return (
    <PageWithForm
      question="Ещё не зарегистрированы?"
      linkTo="/signup"
      linkText="Регистрация"
      modifier="login"
    >
      <Form
        name="login"
        onSubmit={handleSubmit}
        buttonText="Войти"
        heading="Рады видеть!"
      >
        <Input 
        name="email" 
        type="email" 
        placeholder="E-mail" 
        label="E-mail"
         onChange={handleEmailInputState}/>
        <Input
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
