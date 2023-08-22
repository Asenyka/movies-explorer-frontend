import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import Form from "../Form/Form";
import Input from "../Input/Input";
import PageWithForm from "../PageWithForm/PageWithForm";


export default function Login(props) {
  const navigate = useNavigate();
  const {values, handleInputChange, resetForm, errors, isFormValid} = useFormWithValidation();
  useEffect(()=>{
    resetForm({})
   }, [resetForm])

   function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({ password: values.password, email: values.email });
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
        isValid={isFormValid}
      >
        <Input 
        name="email" 
        type="email" 
        placeholder="E-mail" 
        label="E-mail"
         onChange={handleInputChange}
         error={errors.email}
         value={values.email||''}
         
          />
        <Input
          name="password"
          type="password"
          placeholder="Пароль"
          label="Пароль"
          onChange={handleInputChange}
          error={errors.password}
          minLength={4}
          value={values.password||''}
        />
      </Form>
    </PageWithForm>
  );
  }
