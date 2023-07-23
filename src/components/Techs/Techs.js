import Tag from "../Tag/Tag";
import { forwardRef } from "react";
const Techs = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="techs">
      <Tag modifier="techs" text="Технологии" />
      <h3 className="techs__subtitle">7 технологий</h3>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <span className="techs__blocks">
        <p className="techs__block">HTML</p>
        <p className="techs__block">CSS</p>
        <p className="techs__block">JS</p>
        <p className="techs__block">React</p>
        <p className="techs__block">Git</p>
        <p className="techs__block">Express.js</p>
        <p className="techs__block">mongoDB</p>
      </span>
    </section>
  );
});
export default Techs;
