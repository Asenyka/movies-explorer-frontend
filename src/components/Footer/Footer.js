export default function Footer() {
  return (
    <section className="footer">
      <p className="footer__project-info">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__lower-block">
        <div className="footer__platfoms-block">
          <a
            className="link link_footer link_footer_yandex"
            href="https://practicum.yandex.ru/"
          >
            Яндекс.Практикум
          </a>
          <a
            className="link link_footer link_footer_github"
            href="https://github.com/Asenyka"
          >
            Github
          </a>
        </div>
        <p className="footer__copyright">&copy;2020</p>
      </div>
    </section>
  );
}
