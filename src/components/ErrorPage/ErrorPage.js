import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
export default function ErrorPage() {
  const navigate = useNavigate();
  function navigateBack() {
    navigate(-1);
  }
  return (
    <section className="error">
      <span className="error__code">404</span>
      <span className="error__message">Страница не найдена</span>
      <Button onClick={navigateBack} modifier="error" buttonText="Назад" />
    </section>
  );
}
