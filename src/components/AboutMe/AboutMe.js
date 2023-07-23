import Tag from "../Tag/Tag";
import pic from "../../images/pic.jpg";
import { forwardRef } from "react";
const AboutMe = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="aboutMe">
      <Tag text="Студент" />
      <div className="aboutMe__info-block">
        <img
          className="aboutMe__pic"
          alt="Фото студента Практикума"
          src={pic}
        />
        <p className="aboutMe__name">Анастасия</p>
        <p className="aboutMe__job">Фронтенд-разработчик, 37 лет</p>
        <p className="aboutMe__info">
          Я родилась и живу в Москве, получила высшее образование по
          специальности лингвист-переводчик. У меня двое подросших детей. В
          свободное время пишу картины, играю в настольные игры или гуляю с
          семьей. С удовольствием учусь новому. IT-профессии всегда были для
          меня привлекательны. Поэтому когда я услышала о Цифровых профессиях,
          решила пройти обучение. Теперь планирую найти работу по новой
          специальности и продолжать в ней расти.
        </p>
        <a className="link link_aboutMe" href="https://github.com/Asenyka">
          GitHub
        </a>
      </div>
    </section>
  );
});

export default AboutMe;
