import { useEffect, useState } from "react";

export default function FilterCheckbox(props) {
  const [filterChecked, setFilterChecked] = useState(false);
  const searchedFilterState = localStorage.getItem("filterState");
  

  useEffect(()=>{
    if (JSON.parse(searchedFilterState) === false){
      setFilterChecked(false)
    } else if(props.forSavedMovies || !searchedFilterState){
    setFilterChecked(false)
    localStorage.setItem("filterState", JSON.stringify(false))}
    else{
    setFilterChecked(true)
    localStorage.setItem("filterState", JSON.stringify(true))
  }}, [props.forSavedMovies, searchedFilterState])

  
  
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
