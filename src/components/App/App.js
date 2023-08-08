import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter} from "react-router-dom";

import "./App.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Navigation from "../Navigation/Navigation";
import ErrorPage from "../ErrorPage/ErrorPage";
import ProtectedRouteElement from "../PotectedRouteElement";
import { getUserInfo } from "../../utils/MainApi";
import { getCards } from "../../utils/MoviesApi";
import { login, register, checkToken } from "../../utils/MainApi";

function App() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false );
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [filterState, setFilterState] = useState(false);
  const[onSearch, setOnSearch]=useState(false);
  const[tipText, setTipText]=useState('')
  const jwt = localStorage.getItem("jwt");
 

  useEffect(() => {if (jwt) {
    const jwt = localStorage.getItem("jwt");
    checkToken(jwt)
      .then((res) => {
        setLoggedIn(true);
        })
      .catch((err) => {
        console.log(err);
      });
  }
}, []);

  useEffect(() => {
    if (loggedIn) {
   /* getCards()
      .then((cards) => {
        setCards(cards);
       
      })
      .catch((err) => {
        console.log(err);
      });
      */
 getUserInfo()
 .then((user)=>{
  setCurrentUser(user.user);

 })
 .catch((err) => {
  console.log(err);
});
    }
  }, [loggedIn]);

  function openNavigation() {
    setIsNavigationOpen(true);
  }
  function closeNavigation() {
    setIsNavigationOpen(false);
  }

  const savedCards = cards.filter((card) => {
    return card.saved === true;
  });
  function handleRegister(userData) {
    register(userData)
    .then((userData) => {
      setCurrentUser({userData})
    })
      //.then((user) => {
       
       // navigate("/sign-in");
        //setTip("Вы успешно \n зарегистрировались!");
        //setTipImage(tipImageSuccess);
    //  })
      .catch((err) => {
        console.log(err);
        //setTip("Что-то пошло не так! \n Попробуйте еще раз.");
        //setTipImage(tipImageFailure);
      });
  }

  function handleLogin(userData) {
    login(userData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setCurrentUser({userData});
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleFilterClick(state){
    setFilterState(state);
   }
   function filterItems(arr, query) {
    return arr.filter((el) => el.nameRU.toLowerCase().includes(query.toLowerCase())||el.nameEN.toLowerCase().includes(query.toLowerCase()));
  }
  function filterDuration(arr) {
   return arr.filter((el) => el.duration<=40)}

  function handleSearchSubmit(string) {
    setOnSearch(true);
    getCards()
    .then((cards)=>{
      const newCards = filterItems(cards, string);
      if(filterState){
        const shortFilms = filterDuration(newCards);
        if(shortFilms.length!==0) 
      {setCards(shortFilms);}
      else{setTipText("Ничего не найдено")}
      }else{
      if (newCards.length!==0){
setCards(newCards);
      } else {
        setTipText(
          "Ничего не найдено"
        )
      }
    }})
    .catch((err) => {
      setTipText("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.")
      console.log(err);
    });
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser || ""}>
        <div className="App">
          <Header onOpenNavigation={openNavigation} loggedIn={loggedIn} />
          <main>
            <Routes>
              <Route path="/" element={<Main />} />

              <Route
                path="/saved-movies"
                element={ <ProtectedRouteElement
                  element={SavedMovies} cards={savedCards} loggedIn={loggedIn} />}
              />
              <Route path="/movies" element={ <ProtectedRouteElement
                  element={Movies} cards={cards} loggedIn={loggedIn} onSubmit={handleSearchSubmit} onFilterClick={handleFilterClick} onSearch={onSearch} tipText={tipText}/>} />

              <Route path="/profile" element={<ProtectedRouteElement
                  element={Profile} user={currentUser} loggedIn={loggedIn}/>} />
              <Route path="/signin" element={<Login onLogin={handleLogin}/>} />
              <Route path="/signup" element={<Register onRegister={handleRegister}/>} />
            </Routes>
            <ErrorPage />
            <Navigation isOpen={isNavigationOpen} onClose={closeNavigation} />
          </main>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
