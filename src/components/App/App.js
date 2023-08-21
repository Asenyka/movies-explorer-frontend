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
import { getUserInfo, sendUserInfo} from "../../utils/MainApi";
import { getCards } from "../../utils/MoviesApi";
import { login, register, checkToken } from "../../utils/MainApi";
import {
  getUserCards,
  deleteUserCard,
  sendUserCard,
} from "../../utils/MainApi";
import UxPopup from "../UxPopup/UxPopup";

function App() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [isUxPopupOpen, setIsUxPopupOpen] = useState(false);
  const [uxPopupText, setUxPopupText] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [filterState, setFilterState] = useState(false);
  const [onSearch, setOnSearch] = useState(false);
  const[onSavedSearch, setOnSavedSearch]=useState(false)
  const [tipText, setTipText] = useState("");
  const [savedTipText, setSavedTipText]=useState('');
  const [savedSearchString, setSavedSearchString] = useState("");
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
  }, [jwt]);

  useEffect(() => {
    if (loggedIn) {
      getUserInfo()
        .then((user) => {
          setCurrentUser(user.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
    getUserCards()
    .then((userCards) => {
      setSavedCards(userCards)})
      .catch((err) => {
        console.log(err)   
      }) 
    }
  }, []);
  
  function setCardsToLS(cardsToSave) {
    localStorage.setItem("searchedCards", JSON.stringify(cardsToSave));
  }
  function openNavigation() {
    setIsNavigationOpen(true);
  }
  function closeNavigation() {
    setIsNavigationOpen(false);
  }
function closeUxPopup(){
  setIsUxPopupOpen(false)
}
  function handleCardSave(cardID) {
    const searchedCards = localStorage.getItem("searchedCards");
    const searchedCardsArr = JSON.parse(searchedCards);
    const cardToSave = searchedCardsArr.find((el) => el.movieId === cardID);
    sendUserCard(cardToSave)
      .then((savedCard) => {
        const cardIndex = searchedCardsArr.findIndex(
          (el) => el.movieId === savedCard.movieId
        );
        searchedCardsArr[cardIndex] = savedCard;
        setCards(searchedCardsArr);
        setCardsToLS(searchedCardsArr);
        getUserCards()
    .then((userCards) => {
      setSavedCards(userCards)})
      .catch((err) => {
        console.log(err)   
      }) 
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(api_id) {
    deleteUserCard(api_id)
      .then((userCards) => {
        setSavedCards(userCards);
        const searchedCards = localStorage.getItem("searchedCards");
        if (searchedCards) {
          const cardsArr = JSON.parse(searchedCards);
          const cardToDelete = cardsArr.find((el) => el._id === api_id);
          const cardIndex = cardsArr.findIndex((el) => el._id === api_id);
          delete cardToDelete._id;
          delete cardToDelete.owner;
          delete cardToDelete.__v;
          cardsArr[cardIndex] = cardToDelete;
          setCards(cardsArr);
          setCardsToLS(cardsArr);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        setUxPopupText(`Не удалось войти. ${err}`)
        setIsUxPopupOpen(true)
        console.log(err);
      });
  }
  function handleRegister(userData) {
    register(userData)
      .then(() => {
        handleLogin({"email":userData.email, "password":userData.password})
      })
      .catch((err) => {
        setUxPopupText(`Не удалось зарегистрироваться. ${err}`)
        setIsUxPopupOpen(true)
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

  function handleFilterClick(state) {
    setFilterState(state);
    localStorage.setItem("filterState", JSON.stringify(state));
    const cards = localStorage.getItem("allCards");
    const searchString = localStorage.getItem("searchString");
    const searchedCards = filterItems(JSON.parse(cards), searchString);

    if (state) {
      const filteredCards = filterDuration(searchedCards);
      setCards(filteredCards);
      setCardsToLS(filteredCards);
    } else {
      setCards(searchedCards);
      setCardsToLS(searchedCards);
    }
  }
  function handleSavedFilterClick(state) {
        setFilterState(state);
        getUserCards()
        .then((userCards) => {
          const searchedCards = filterItems(userCards, savedSearchString);
          if (state) {
            const filteredCards = filterDuration(searchedCards);
            setSavedCards(filteredCards);
          } else {
            setSavedCards(searchedCards);
          }
        })
          .catch((err) => {
            setSavedTipText(
              "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
            );
            console.log(err)   
          })
        
  }
  function handleSearchSavedSubmit(string) {
    setOnSavedSearch(true)
    setSavedSearchString(string);
    const newCards = filterItems(savedCards, string);
    if (filterState) {
      const shortFilms = filterDuration(newCards);
      if (shortFilms.length !== 0) {
        setSavedCards(shortFilms);
      } else {
        setTipText("Ничего не найдено");
      }
    } else {
      if (newCards.length !== 0) {
        setSavedCards(newCards);
      } else {
        setTipText("Ничего не найдено");
      }
    }
  }

  function handleSearchSubmit(string) {
    setOnSearch(true);
    localStorage.setItem("searchString", string);
    localStorage.setItem("filterState", JSON.stringify(filterState));

    getCards()
      .then((cards) => {
        cards.forEach((el) => {
          const thumbnail = el.image.formats.thumbnail.url;
          el.image = `https://api.nomoreparties.co/${el.image.url}`;
          el.thumbnail = `https://api.nomoreparties.co/${thumbnail}`;
          el.movieId = el.id;
          delete el.id;
          delete el.created_at;
          delete el.updated_at;
        });
        localStorage.setItem("allCards", JSON.stringify(cards));
        cards.forEach((el) => {
          if (savedCards.includes((item) => item.movieId === el.movieId)) {
            el.remove();
          }
        });
        const cardsAndSavedCards = cards.concat(savedCards);
        const newCards = filterItems(cardsAndSavedCards, string);
        localStorage.setItem("searchedCards", JSON.stringify(newCards));
        if (filterState) {
          const shortFilms = filterDuration(newCards);
          if (shortFilms.length !== 0) {
            setCards(shortFilms);
            localStorage.setItem("searchedCards", JSON.stringify(shortFilms));
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

  function handleEditUserData(userData){
 sendUserInfo(userData)
 .then((user)=>{
setUxPopupText("Данные пользователя успешно обновлены");
setIsUxPopupOpen(true);
setCurrentUser(user)
 })
 .catch((err)=>{
  setUxPopupText("Не удалось обновить данные пользователя")
  setIsUxPopupOpen(true)
  console.log(err)
 })
  }
  function handleCheckOut() {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/signin");
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
                  onCardDelete={handleCardDelete}
                  onSearchSubmit={handleSearchSavedSubmit}
                  onFilterClick={handleSavedFilterClick}
                  onSearch={onSavedSearch}
                  tipText={savedTipText}
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
                  onCardDelete={handleCardDelete}
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
                  onSubmit={handleEditUserData}
                />
              }
            />
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/signup"
              element={<Register onRegister={handleRegister} />}
            />
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
          <UxPopup isOpen={isUxPopupOpen} text={uxPopupText} onClose={closeUxPopup}/>
          <Navigation isOpen={isNavigationOpen} onClose={closeNavigation} />
        </main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
