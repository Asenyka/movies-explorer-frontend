import cross from "../../images/cross.svg";
import Button from "../Button/Button";
export default function UxPopup(props){
        return(
        <div className={`popup${props.isOpen ? " popup_opened" : ""}`}>

            <div className="popup__container">
            <Button
            buttonText={<img src={cross} alt="Пиктограмма крестика" />}
            modifier="close"
            onClick={props.onClose}
            type="button"
          />
          <p className="popup__text">{props.text}</p>
          </div>
      </div>
    );
}