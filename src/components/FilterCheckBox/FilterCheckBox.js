import { useEffect, useState } from "react";

export default function FilterCheckbox(props) {
  const [filterChecked, setFilterChecked] = useState(false);
  const searchedFilterState = localStorage.getItem("filterState");
  
  useEffect(()=>{
    props.forSavedMovies?setFilterChecked(false):setFilterChecked(JSON.parse(searchedFilterState))
  }, [])
  
  function handleFilterClick(){
    setFilterChecked(!filterChecked);
    props.onClick(!filterChecked);
    
   }
    return (
    <div className="filter">
      <input
        className="filter__checkbox"
        id="checkbox"
        name="checkbox"
        type="checkbox"
       onChange={handleFilterClick}
       checked={filterChecked}
      />
      <label htmlFor="checkbox" className="filter__name">
        Короткометражки
      </label>
    </div>
  );
}
