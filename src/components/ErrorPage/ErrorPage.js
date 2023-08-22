import { useNavigate } from "react-router-dom"
import Button from "../Button/Button";
export default function ErrorPage() {
  let navigate = useNavigate();

  return (
    <section className="error">
      <span className="error__code">404</span>
      <span className="error__message">Страница не найдена</span>
      <Button onClick={() => navigate(-1)} modifier="error" buttonText="Назад" />
    </section>
  );
}
