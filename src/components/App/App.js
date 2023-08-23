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
        .then(() => {})
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
    //console.log(currentUser._id)
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
  //При закрузке страницы, если есть в локальном хранилище карточки, изменении массива modifiedCards в локальном хранилище или savedCards state,  происходит создание массива currentCards
  //Дальше при поиске он используется как основа для поиска и создания массива filteredCards который передается на отображение

  /* useEffect(() => {
   console.log(modifiedCards)
    if (modifiedCards) {
      const modifiedCardsArr = JSON.parse(modifiedCards);
      modifiedCardsArr.forEach((el) => {
        if (savedCards.includes((item) => item.movieId === el.movieId)) {
          el.remove();
        }
      });
      const cardsAndSavedCards = modifiedCardsArr.concat(savedCards);
      setCurrentCards(cardsAndSavedCards);
    } else{
      setCurrentCards([])
    }
  }, [savedCards, modifiedCards]);
  */

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

    //  localStorage.setItem("allCards", JSON.stringify(cards));
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
        localStorage.setItem("searchedCards", JSON.stringify(newCards));

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
          filterCards(currentCards, string, state);
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
      filterCards(currentCards, string, state);
    }
  }

  function handleCardSave(cardID) {
    const searchedCards = localStorage.getItem("searchedCards");
    const searchedCardsArr = JSON.parse(searchedCards);
    const savedCardsCopy = savedCards;
    const cardToSave = searchedCardsArr.find((el) => el.movieId === cardID);
    const cardIndex = searchedCardsArr.findIndex((el) => el.movieId === cardID);
    sendUserCard(cardToSave)
      .then((savedCard) => {
        searchedCardsArr.splice(cardIndex, 1, savedCard);
        setFilteredCards(searchedCardsArr);
        localStorage.setItem("searchedCards", JSON.stringify(searchedCardsArr));
        savedCardsCopy.unshift(savedCard);
        setSavedCards(savedCardsCopy);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(api_id) {
    //const string = localStorage.getItem("searchString");
    //const state = localStorage.getItem("filterState");
    const searchedCards = localStorage.getItem("searchedCards");
    const searchedCardsArr = JSON.parse(searchedCards);
    const cardToDelete = searchedCardsArr.find((el) => el._id === api_id);
    const cardIndex = searchedCardsArr.findIndex((el) => el._id === api_id);
    //const modifiedCardsArr = JSON.parse(modifiedCards);
    deleteUserCard(api_id)
      .then((userCards) => {
        delete cardToDelete._id;
        delete cardToDelete.owner;
        delete cardToDelete.__v;
        searchedCardsArr.splice(cardIndex, 1, cardToDelete);
        setFilteredCards(searchedCardsArr);
        localStorage.setItem("searchedCards", JSON.stringify(searchedCardsArr));
        const currentUserCards = userCards.filter(
          (el) => el.owner === currentUser._id
        );
        setSavedCards(currentUserCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleFilterClick(state) {
    const string = localStorage.getItem("searchString");
    filterCards(string, state);
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
    setLoggedIn(false);
    navigate("/", { replace: true });
  }
  function handleLogin(userData) {
    login(userData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setCurrentUser({ userData });
      })
      .then(() => {
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setUxPopupText(`Не удалось войти. ${err}`);
        setIsUxPopupOpen(true);
        console.log(err);
      });
  }
  function handleRegister(userData) {
    register(userData)
      .then(() => {
        handleLogin({ email: userData.email, password: userData.password });
      })
      .catch((err) => {
        setUxPopupText(`Не удалось зарегистрироваться. ${err}`);
        setIsUxPopupOpen(true);
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser || ""}>
      <div className="App">
        <Header onOpenNavigation={openNavigation} loggedIn={loggedIn} />
        <main>
          <Routes>
            <Route
              path="/saved-movies"
              element={
                loggedIn ? (
                  <ProtectedRouteElement
                    element={SavedMovies}
                    cards={savedCards}
                    loggedIn={loggedIn}
                    onCardDelete={handleCardDelete}
                    filterItems={filterNames}
                    filterDuration={filterDuration}
                  />
                ) : (
                  <></>
                )
              }
            />
            <Route
              path="/movies"
              element={
                loggedIn ? (
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
                  />
                ) : (
                  <></>
                )
              }
            />

            <Route
              path="/profile"
              element={
                loggedIn ? (
                  <ProtectedRouteElement
                    element={Profile}
                    user={currentUser}
                    loggedIn={loggedIn}
                    onCheckout={handleCheckOut}
                    onSubmit={handleEditUserData}
                  />
                ) : (
                  <></>
                )
              }
            />

            <Route
              path="/signin"
              element={
                loggedIn ? (
                  <RedirectComponent />
                ) : (
                  <Login onLogin={handleLogin} loggedIn={loggedIn} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                loggedIn ? (
                  <RedirectComponent />
                ) : (
                  <Register onRegister={handleRegister} />
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
