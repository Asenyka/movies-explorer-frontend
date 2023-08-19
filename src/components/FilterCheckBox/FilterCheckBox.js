import { useEffect, useState } from "react";

export default function FilterCheckbox(props) {
  const [filterChecked, setFilterChecked] = useState(false);
  const [savedFilterChecked, setSavedFilterChecked]=useState(false);
  const searchedFilterState = localStorage.getItem("filterState");
  
  useEffect(()=>{
    props.forSavedMovies?setFilterChecked(false):setFilterChecked(JSON.parse(searchedFilterState))
  }, [])
  
  function handleFilterClick(){
    if(props.forSavedMovies){
      setSavedFilterChecked(!savedFilterChecked);
      props.onClick(!savedFilterChecked);
    }else{
    setFilterChecked(!filterChecked);
    props.onClick(!filterChecked);
    }
   }
    return (
    <div className="filter">
      <input
        className="filter__checkbox"
        id="checkbox"
        name="checkbox"
        type="checkbox"
       onChange={handleFilterClick}
       checked={props.forSavedMovies?savedFilterChecked:filterChecked}
      />
      <label htmlFor="checkbox" className="filter__name">
        Короткометражки
      </label>
    </div>
  );
}
