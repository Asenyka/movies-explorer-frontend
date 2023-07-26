import Tag from "../Tag/Tag";
import { forwardRef } from "react";
const AboutProject = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="aboutProject">
      <Tag modifier="aboutProject" text="О проекте" />
      <div className="aboutProject__description">
        <h3 className="aboutProject__heading aboutProject__heading_left">
          Дипломный проект включал 5 этапов
        </h3>
        <p className="aboutProject__text">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <h3 className="aboutProject__heading aboutProject__heading_right">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="aboutProject__text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="aboutProject__timeline">
        <span className="aboutProject__timeline-text aboutProject__timeline-text_green">
          1 неделя
        </span>
        <span className="aboutProject__timeline-text">4 недели</span>
        <span className="aboutProject__timeline-caption">Back-end</span>
        <span className="aboutProject__timeline-caption">Front-end</span>
      </div>
    </section>
  );
});
export default AboutProject;
