import { Link } from "react-router-dom";
export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__heading">Портфолио</h2>
      <ul className="portfolio__links-block">
        <li className="portfolio__link">
          <Link
            className="link link_portfolio"
            to="https://asenyka.github.io/how-to-learn/"
            target="_blank"
          >
            <span className="portfolio__project-name">Статичный сайт</span>
            <span className="portfolio__arrow">↗</span>
          </Link>
        </li>
        <li className="portfolio__link">
          <Link
            className="link link_portfolio"
            to="https://asenyka.github.io/russian-travel/"
            target="_blank"
          >
            <span className="portfolio__project-name">Адаптивный сайт</span>
            <span className="portfolio__arrow">↗</span>
          </Link>
        </li>
        <li className="portfolio__link">
          <Link
            className="link link_portfolio"
            to="https://humsterchik.nomoreparties.sbs/sign-up"
            target="_blank"
          >
            <span className="portfolio__project-name">
              Одностраничное приложение
            </span>
            <span className="portfolio__arrow">↗</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
