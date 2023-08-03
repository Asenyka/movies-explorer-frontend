import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import { useRef } from "react";
export default function Main() {
  const projectRef = useRef();
  const techsRef = useRef();
  const studentRef = useRef();
  function handleProjectClick() {
    projectRef.current.scrollIntoView({ behavior: "smooth" });
  }
  function handleTechsClick() {
    techsRef.current.scrollIntoView({ behavior: "smooth" });
  }
  function handleStudentClick() {
    studentRef.current.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <section className="main">
      <Promo
        onTechsClick={handleTechsClick}
        onProjectClick={handleProjectClick}
        onStudentClick={handleStudentClick}
      />
      <AboutProject ref={projectRef} />
      <Techs ref={techsRef} />
      <AboutMe ref={studentRef} />
      <Portfolio />
    </section>
  );
}
