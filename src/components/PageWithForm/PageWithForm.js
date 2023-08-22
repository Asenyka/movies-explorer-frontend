import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

export default function PageWithForm(props) {
  return (
    <section className={`page-with-form page-with-form_${props.modifier}`}>
      <Link className="link" to="/">
        <img src={logo} className="page-with-form__logo" alt="Логотип" />
      </Link>
      {props.children}
      <div className="page-with-form__offer">
        <p className="page-with-form__question">{props.question}</p>
        <Link className="link link_page-with-form" to={props.linkTo}>
          {props.linkText}
        </Link>
      </div>
    </section>
  );
}
