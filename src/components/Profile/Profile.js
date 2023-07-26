import Button from "../Button/Button";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
export default function Profile() {
  const currentUser = useContext(CurrentUserContext);
  const [inputNameValue, setInputNameValue] = useState(currentUser.name);
  const [inputEmailValue, setInputEmailValue] = useState(currentUser.email);
  const [isFormButtonInactive, setIsFormButtonInactive] = useState(true);
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
      >
        <Input
          form="profile"
          name="name"
          type="text"
          placeholder="Имя"
          label="Имя"
          value={inputNameValue}
          onChange={(e) => setInputNameValue(e.target.value)}
        />
        <Input
          form="profile"
          name="email"
          type="email"
          placeholder="E-mail"
          label="E-mail"
          value={inputEmailValue}
          onChange={(e) => setInputEmailValue(e.target.value)}
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
          />
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
