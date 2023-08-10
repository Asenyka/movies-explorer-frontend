import Button from "../Button/Button";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { useContext, useState, useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation"
import CurrentUserContext from "../../contexts/CurrentUserContext";
export default function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [isFormButtonInactive, setIsFormButtonInactive] = useState(true);
  const {values, handleInputChange, resetForm, errors, isValid} = useFormWithValidation();
  useEffect(()=>{
    resetForm(currentUser)
    console.log(currentUser)
    console.log(resetForm)
  }, [resetForm, currentUser])

  console.log(values)

  function handleEditClick(e) {
    e.preventDefault();
    setIsFormButtonInactive(false);
  }

  return (
    <section className="profile">
      <Form
        name="profile"
        heading={`Привет, ${currentUser.name}!`}
        buttonText="Сохранить"
        isFormButtonInactive={isFormButtonInactive}
        isvalid={isValid}       
      >
        <Input
          form="profile"
          name="name"
          type="text"
          placeholder="Введите имя"
          label="Имя"
          value={values?values.name:''}
          onChange={handleInputChange}
          errors={errors}
          
        />
        <Input
          form="profile"
          name="email"
          type="email"
          placeholder="Введите e-mail"
          label="E-mail"
          value={values?values.email:''}
          onChange={handleInputChange}
          errors={errors}
        />
      </Form>
      {isFormButtonInactive ? (
        <div className="profile__buttons">
          <Button
            buttonText="Редактировать"
            modifier="pofile button_profile_edit"
            onClick={handleEditClick}
          />
          <Button
            buttonText="Выйти из аккаунта"
            modifier="profile button_profile_exit"
            onClick={props.onCheckout}
          />
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
