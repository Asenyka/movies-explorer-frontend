import { useEffect, useState } from "react";

export default function FilterCheckbox(props) {
  const [filterChecked, setFilterChecked] = useState(false);
 const searchedFilterState = localStorage.getItem("filterState");

  

  useEffect(()=>{
    console.log(searchedFilterState)
    if (JSON.parse(searchedFilterState) === false){
      setFilterChecked(false)
    } else if(props.forSavedMovies || searchedFilterState===null){
    setFilterChecked(false)}
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
