import Form from "../Form/Form";
import Input from "../Input/Input";
import PageWithForm from "../PageWithForm/PageWithForm";

export default function Login() {
  function handleSubmit() {
    console.log("submit");
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
        <Input name="email" type="email" placeholder="E-mail" label="E-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Пароль"
          label="Пароль"
        />
      </Form>
    </PageWithForm>
  );
}
