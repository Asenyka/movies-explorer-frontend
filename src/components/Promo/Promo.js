import NavTab from "../NavTab/NavTab";
export default function Promo(props) {
  return (
    <section className="promo">
      <h1 className="promo__heading">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <NavTab
        onStudentClick={props.onStudentClick}
        onProjectClick={props.onProjectClick}
        onTechsClick={props.onTechsClick}
      />
    </section>
  );
}
