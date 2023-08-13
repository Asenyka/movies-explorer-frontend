import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

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
import { getUserCards, deleteUserCard, sendUserCard } from "../../utils/MainApi";

function App() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const[savedCards, setSavedCards] = useState([]);
  const [filterState, setFilterState] = useState(false);
  const [onSearch, setOnSearch] = useState(false);
  const [tipText, setTipText] = useState("");
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (jwt) {
      const jwt = localStorage.getItem("jwt");
      checkToken(jwt)
        .then(() => {
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
       getUserInfo()
        .then((user) => {
          setCurrentUser(user.user);
        })
        .catch((err) => {
          console.log(err);
        });
        getUserCards()
        .then((userCards)=>{
          if(userCards){
                 setSavedCards(userCards)
          }
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }, [loggedIn]);

  function openNavigation() {
    setIsNavigationOpen(true);
  }
  function closeNavigation() {
    setIsNavigationOpen(false);
  }
function handleCardSave(cardID){
const searchedCards = localStorage.getItem("searchedCards");
const searchedCardsArr = JSON.parse(searchedCards)
const cardToSave = searchedCardsArr.find(el=>el.movieId===cardID)
sendUserCard(cardToSave)
.then((savedCard)=>{
 const cardIndex=searchedCardsArr.findIndex((el)=>el.movieId===savedCard.movieId);
 searchedCardsArr[cardIndex]=savedCard;
 setCards(searchedCardsArr);
 localStorage.setItem("searchedCards", JSON.stringify(searchedCardsArr));
 getUserCards().
 then((userCards)=>{
  const savedCardsCopy = userCards;
  console.log(savedCardsCopy);
  savedCardsCopy.append(savedCard);
  setSavedCards(savedCardsCopy);
 })
 .catch((err)=>{
  console.log(err)
})
})
.catch((err)=>{
  console.log(err)
})
}
function handleCardDelete(cardID){
  deleteUserCard()
}
 


  function handleLogin(userData) {
    login(userData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setCurrentUser({ userData });
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleRegister(userData) {
    register(userData)
      .then(() => {
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        console.log(err);
       });
  }

 
  function filterItems(arr, query) {
    return arr.filter(
      (el) =>
        el.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        el.nameEN.toLowerCase().includes(query.toLowerCase())
    );
  }
  function filterDuration(arr) {
    return arr.filter((el) => el.duration <= 40);
  }
  function handleRepeatedSearch() {
    const cards = localStorage.getItem("allCards");
    const searchString = localStorage.getItem("searchString");
    const searchedCards = filterItems(JSON.parse(cards), searchString);
    setCards(searchedCards);
    localStorage.setItem("filterState", JSON.stringify(false));
    localStorage.setItem("searchedCards", JSON.stringify(searchedCards));
  }
  function handleFilterClick(state) {
    setFilterState(state);
    if (state === true) {
     const allCards = localStorage.getItem("allCards");
      const filteredCards = filterDuration(JSON.parse(allCards));
      setCards(filteredCards);
      localStorage.setItem("searchedCards", JSON.stringify(filteredCards));
      localStorage.setItem("filterState", JSON.stringify(state));

    } else {
      handleRepeatedSearch();
    }
  }

  function handleSearchSubmit(string) {
    setOnSearch(true);
    localStorage.setItem("searchString", string);
    localStorage.setItem("filterState", JSON.stringify(filterState));
    
    getCards()
      .then((cards) => {
        cards.forEach((el)=>{
          const thumbnail=el.image.formats.thumbnail.url;
        el.image=`https://api.nomoreparties.co/${el.image.url}`;
        el.thumbnail=`https://api.nomoreparties.co/${thumbnail}`;
        el.movieId=el.id;
        delete el.id;
        delete el.created_at;
        delete el.updated_at;
     })
        localStorage.setItem("allCards", JSON.stringify(cards));
        cards.forEach((el) =>{
       if(savedCards.includes((item)=>item.movieId===el.moviesId)){
          el.owner=currentUser._id}})
        const newCards = filterItems(cards, string);
        localStorage.setItem("searchedCards", JSON.stringify(newCards));
        if (filterState) {
          const shortFilms = filterDuration(newCards);

          if (shortFilms.length !== 0) {
            setCards(shortFilms);
            localStorage.setItem("searchedCards", JSON.stringify(shortFilms))
          } else {
            setTipText("Ничего не найдено");
          }
        } else {
          if (newCards.length !== 0) {
            setCards(newCards);
          } else {
            setTipText("Ничего не найдено");
          }
        }
      })
      .catch((err) => {
        setTipText(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
        console.log(err);
      });
  }
  function handleCheckOut() {
    localStorage.clear();
    setLoggedIn(false);
    navigate('/signin')
  }


  return (
        <CurrentUserContext.Provider value={currentUser || ""}>
        <div className="App">
          <Header onOpenNavigation={openNavigation} loggedIn={loggedIn} />
          <main>
            <Routes>
              <Route path="/" element={<Main />} />

              <Route
                path="/saved-movies"
                element={
                  <ProtectedRouteElement
                    element={SavedMovies}
                   cards={savedCards}
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRouteElement
                    element={Movies}
                   cards={cards}
                    loggedIn={loggedIn}
                    onSearchSubmit={handleSearchSubmit}
                    onFilterClick={handleFilterClick}
                    onSearch={onSearch}
                    tipText={tipText}
                    onCardSave={handleCardSave}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRouteElement
                    element={Profile}
                    user={currentUser}
                    loggedIn={loggedIn}
                    onCheckout={handleCheckOut}
                  />
                }
              />
              <Route path="/signin" element={<Login onLogin={handleLogin} />} />
              <Route
                path="/signup"
                element={<Register onRegister={handleRegister} />}
              />
            </Routes>
            <ErrorPage />
            <Navigation isOpen={isNavigationOpen} onClose={closeNavigation} />
          </main>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;