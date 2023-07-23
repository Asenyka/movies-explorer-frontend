import Form from "../Form/Form";
import Input from "../Input/Input";
import PageWithForm from "../PageWithForm/PageWithForm";

export default function Register() {
  function handleSubmit() {
    console.log("submit");
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
        />
        <Input
          form="register"
          name="email"
          type="email"
          placeholder="E-mail"
          label="E-mail"
        />
        <Input
          form="register"
          name="password"
          type="password"
          placeholder="Пароль"
          label="Пароль"
        />
      </Form>
    </PageWithForm>
  );
}
