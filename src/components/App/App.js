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
import RedirectComponent from "../RedirectComponent/RedirectComponent";
import { getUserInfo, sendUserInfo } from "../../utils/MainApi";
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
  const [uxPopupText, setUxPopupText] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
const [isSendingForm, setIsSendingForm]=useState(false);
  const [currentCards, setCurrentCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const modifiedCards = localStorage.getItem("allCards");

  const [isSearching, setIsSearching] = useState(false);
  const [onSearch, setOnSearch] = useState(false);

  const [tipText, setTipText] = useState("");

  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
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
          const currentUserCards = userCards.filter(
            (el) => el.owner === currentUser._id
          );
          setSavedCards(currentUserCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn, setSavedCards, currentUser._id]);
 

  function modifyCards(cards) {
    cards.forEach((el) => {
      const thumbnail = el.image.formats.thumbnail.url;
      el.image = `https://api.nomoreparties.co/${el.image.url}`;
      el.thumbnail = `https://api.nomoreparties.co/${thumbnail}`;
      el.movieId = el.id;
      delete el.id;
      delete el.created_at;
      delete el.updated_at;
    });

    return cards;
  }
  function filterNames(arr, query) {
    return arr.filter(
      (el) =>
        el.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        el.nameEN.toLowerCase().includes(query.toLowerCase())
    );
  }
  function filterDuration(arr) {
    return arr.filter((el) => el.duration <= 40);
  }
  function filterCards(cardsToFilter, string, state) {
    const newCards = filterNames(cardsToFilter, string);
    if (state === true) {
      const shortFilms = filterDuration(newCards);
      if (shortFilms.length !== 0) {
        setFilteredCards(shortFilms);
        setIsSearching(false);
        setOnSearch(true);
        localStorage.setItem("searchedCards", JSON.stringify(shortFilms));

      } else {
        setTipText("Ничего не найдено");
        setOnSearch(true);
      }
    } else {
      if (newCards.length !== 0) {
        setFilteredCards(newCards);
        setOnSearch(true);
        setIsSearching(false);
        localStorage.setItem("searchedCards", JSON.stringify(newCards));
        } else {
        setTipText("Ничего не найдено");
        setOnSearch(true);
        setIsSearching(false);
      }
    }
  }

  function compileCards(modifiedCards) {
    const newModifiedCards = modifiedCards.filter(
      (e) => savedCards.findIndex((i) => i.nameRU === e.nameRU) === -1
    );
    const cardsAndSavedCards = savedCards.concat(newModifiedCards);
    setCurrentCards(cardsAndSavedCards);
    return cardsAndSavedCards;
  }
  function handleSearchSubmit(string) {
    setIsSearching(true);
    localStorage.setItem("searchString", string);
    const state = localStorage.getItem("filterState");
    if (!modifiedCards) {
      getCards()
        .then((cards) => {
          const modifiedCards = modifyCards(cards);
          localStorage.setItem("allCards", JSON.stringify(modifiedCards));
          const currentCards = compileCards(modifiedCards);
          filterCards(currentCards, string, JSON.parse(state));
        })
        .catch((err) => {
          setIsSearching(false);
          setTipText(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          );
          console.log(err);
        });
    } else {
      const modifiedCardsArr = JSON.parse(modifiedCards);
      const currentCards = compileCards(modifiedCardsArr);
      filterCards(currentCards, string, JSON.parse(state));
    }
  }

  function handleCardSave(cardID) {
    const searchedCards = localStorage.getItem("searchedCards");
    const searchedCardsArr = JSON.parse(searchedCards);
    const savedCardsCopy = Array.from(savedCards);
    const cardToSave = searchedCardsArr.find((el) => el.movieId === cardID);
    const cardIndex = searchedCardsArr.findIndex((el) => el.movieId === cardID);
    sendUserCard(cardToSave)
      .then((savedCard) => {
        searchedCardsArr.splice(cardIndex, 1, savedCard);
        setFilteredCards(searchedCardsArr);
        localStorage.setItem("searchedCards", JSON.stringify(searchedCardsArr));
        savedCardsCopy.unshift(savedCard);
        setSavedCards(savedCardsCopy);
        if (currentCards.length!==0) {
          const currentCardsCopy = Array.from(currentCards);
          const cardIndex2 = currentCardsCopy.findIndex((el) => el.movieId === cardID);
          currentCardsCopy.splice(cardIndex2, 1, savedCard);
          setCurrentCards(currentCardsCopy);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(api_id) {
      const cardToDelete = savedCards.find((el) => el._id === api_id);
    deleteUserCard(api_id)
      .then((userCards) => {
        const currentUserCards = userCards.filter(
          (el) => el.owner === currentUser._id
        );
        setSavedCards(currentUserCards);
        const searchedCards = localStorage.getItem("searchedCards");
        if (searchedCards){
         const searchedCardsArr = JSON.parse(searchedCards);
        delete cardToDelete._id;
        delete cardToDelete.owner;
        delete cardToDelete.__v;
        const cardIndex = searchedCardsArr.findIndex((el) => el._id === api_id);
        searchedCardsArr.splice(cardIndex, 1, cardToDelete);
        setFilteredCards(searchedCardsArr);
        localStorage.setItem("searchedCards", JSON.stringify(searchedCardsArr));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleFilterClick(state) {
    localStorage.setItem("filterState", JSON.stringify(state));
    const string = localStorage.getItem("searchString");
    const searchedCards = localStorage.getItem("searchedCards");
    if(currentCards.length!==0){
     const cardsToFilter = Array.from(currentCards);
    console.log(cardsToFilter)
    filterCards(cardsToFilter, string, state)}
    else if(searchedCards){
      const cardsToFilter = JSON.parse(searchedCards);
      filterCards(cardsToFilter, string, state);
    }
    
    
    
  }

  function handleEditUserData(userData) {
    sendUserInfo(userData)
      .then((user) => {
        setUxPopupText("Данные пользователя успешно обновлены");
        setIsUxPopupOpen(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        setUxPopupText("Не удалось обновить данные пользователя");
        setIsUxPopupOpen(true);
        console.log(err);
      });
  }
  function openNavigation() {
    setIsNavigationOpen(true);
  }
  function closeNavigation() {
    setIsNavigationOpen(false);
  }
  function closeUxPopup() {
    setIsUxPopupOpen(false);
  }
  function handleCheckOut() {
    localStorage.clear();
    setFilteredCards([]);
    setCurrentCards([]);
    setLoggedIn(false);
    navigate("/", { replace: true });
  }
  function handleLogin(userData) {
    setIsSendingForm(true)
    login(userData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setCurrentUser({ userData });
        setIsSendingForm(false)
      })
      .then(() => {
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setUxPopupText(`Не удалось войти. ${err}`);
        setIsUxPopupOpen(true);
        setIsSendingForm(false)
        console.log(err);
      });
  }
  function handleRegister(userData) {
    setIsSendingForm(true)
    register(userData)
      .then(() => {
        handleLogin({ email: userData.email, password: userData.password });
        setIsSendingForm(false)
      })
      .catch((err) => {
        setUxPopupText(`Не удалось зарегистрироваться. ${err}`);
        setIsUxPopupOpen(true);
        setIsSendingForm(false)
        console.log(err);
      });
  }
console.log(loggedIn)
  return (
    <CurrentUserContext.Provider value={currentUser || ""}>
      <div className="App">
        <Header onOpenNavigation={openNavigation} loggedIn={loggedIn} />
        <main>
          <Routes>
            <Route
              path="/saved-movies"
              element={loggedIn?
                  <ProtectedRouteElement
                    element={SavedMovies}
                    cards={savedCards}
                    loggedIn={loggedIn}
                    onCardDelete={handleCardDelete}
                    filterItems={filterNames}
                    filterDuration={filterDuration}
                  />:
                  <RedirectComponent/>
              }
            />
            <Route
              path="/movies"
              element={loggedIn?
                    <ProtectedRouteElement
                    element={Movies}
                    cards={filteredCards}
                    loggedIn={loggedIn}
                    onSearchSubmit={handleSearchSubmit}
                    onFilterClick={handleFilterClick}
                    onSearch={onSearch}
                    tipText={tipText}
                    onCardSave={handleCardSave}
                    onCardDelete={handleCardDelete}
                    isSearching={isSearching}
                  />:
                  <></>
              }
            />

            <Route
              path="/profile"
              element={loggedIn?
                  <ProtectedRouteElement
                    element={Profile}
                    isSendingForm={isSendingForm}
                    user={currentUser}
                    loggedIn={loggedIn}
                    onCheckout={handleCheckOut}
                    onSubmit={handleEditUserData}
                  />:
                  <RedirectComponent/>
              }
            />

            <Route
              path="/signin"
              element={
                loggedIn ? (
                  <RedirectComponent />
                ) : (
                  <Login onLogin={handleLogin} loggedIn={loggedIn} isSendingForm={isSendingForm} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                loggedIn ? (
                  <RedirectComponent />
                ) : (
                  <Register onRegister={handleRegister} isSendingForm={isSendingForm} />
                )
              }
            />

            <Route path="/" element={<Main />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <UxPopup
            isOpen={isUxPopupOpen}
            text={uxPopupText}
            onClose={closeUxPopup}
          />
          <Navigation isOpen={isNavigationOpen} onClose={closeNavigation} />
        </main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
