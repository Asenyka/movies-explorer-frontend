import Button from "../Button/Button";
export default function NavTab(props) {
  return (
    <ul className="navtab">
      <li>
        <Button
          buttonText="О проекте"
          modifier="navtab"
          onClick={props.onProjectClick}
        />
      </li>
      <li>
        <Button
          buttonText="Технологии"
          modifier="navtab"
          onClick={props.onTechsClick}
        />
      </li>
      <li>
        <Button
          buttonText="Студент"
          modifier="navtab"
          onClick={props.onStudentClick}
        />
      </li>
    </ul>
  );
}
