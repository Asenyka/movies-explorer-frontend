export default function FilterCheckbox() {
  return (
    <div className="filter">
      <input
        className="filter__checkbox"
        id="checkbox"
        name="checkbox"
        type="checkbox"
      />
      <label htmlFor="checkbox" className="filter__name">
        Короткометражки
      </label>
    </div>
  );
}
