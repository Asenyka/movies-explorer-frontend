import Button from "../Button/Button";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { useContext, useState, useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation"
import CurrentUserContext from "../../contexts/CurrentUserContext";
export default function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const {values, handleInputChange, resetForm, errors, isFormValid} = useFormWithValidation();
  const [isDisabled, setIsDisabled] =useState(true);
  const [isEditFormValid, setIsEditFormValid] = useState(false);
    const [isFormButtonInvisible, setIsFormButtonInvisible] = useState(true);
  const newDataMarker=values.name !== currentUser.name || values.email !== currentUser.email

  
  useEffect(()=>{
    resetForm(currentUser)
  }, [resetForm, currentUser])

useEffect(()=>
{
  console.log(newDataMarker)
  if(newDataMarker&&isFormValid){
  setIsEditFormValid(true);
  }
  else{

    setIsEditFormValid(false);
  }

},[newDataMarker, isFormValid]
)
 
  function handleEditClick(e) {
    e.preventDefault();
    setIsFormButtonInvisible(false);
    setIsDisabled(false);
  }
  
  function editProfileData(e){
    e.preventDefault();
 const newUserData={name:values.name, email:values.email}
props.onSubmit(newUserData)
    setIsFormButtonInvisible(true)
  }
 

  return (
    <section className="profile">
      <Form
        name="profile"
        heading={`Привет, ${currentUser.name}!`}
        buttonText="Сохранить"
        isFormButtonInvisible={isFormButtonInvisible}
        isValid={isEditFormValid}  
        onSubmit={editProfileData}     
      >
        <Input
         type="text"
         disabled={isDisabled}
          form="profile"
          name="name"
          placeholder="Введите имя"
          label="Имя"
          value={values?values.name:''}
          onChange={handleInputChange}
          error={errors.name}
          minLength={2}
          maxLength={32}
         />
        <Input
          form="profile"
          name="email"
          type="email"
          disabled={isDisabled}
          placeholder="Введите e-mail"
          label="E-mail"
          value={values?values.email:''}
          onChange={handleInputChange}
          error={errors.email}
     
          />
      </Form>
      {isFormButtonInvisible ? (
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
