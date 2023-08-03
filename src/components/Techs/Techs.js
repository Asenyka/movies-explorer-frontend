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
      <div className="techs__blocks">
        <span className="techs__block">HTML</span>
        <span className="techs__block">CSS</span>
        <span className="techs__block">JS</span>
        <span className="techs__block">React</span>
        <span className="techs__block">Git</span>
        <span className="techs__block">Express.js</span>
        <span className="techs__block">mongoDB</span>
      </div>
    </section>
  );
});
export default Techs;
