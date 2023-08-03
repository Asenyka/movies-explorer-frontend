import { useState } from "react";
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
import snapshot from "../../images/snapshot.png";
import { login, register, checkToken } from "../../utils/Authentification";

function App() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  function openNavigation() {
    setIsNavigationOpen(true);
  }
  function closeNavigation() {
    setIsNavigationOpen(false);
  }
  const cards = [
    {
      id: 12345676,
      name: "33 слова о дизайне",
      duration: "1ч 47м",
      saved: true,
      snapshot: snapshot,
    },
    {
      id: 12345689,
      name: "34 слова о дизайне",
      saved: false,
      duration: "1ч 48м",
      snapshot: snapshot,
    },
    {
      id: 12345657,
      name: "35 слов о дизайне",
      saved: false,
      duration: "1ч 50м",
      snapshot: snapshot,
    },
  ];
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
                  element={SavedMovies} cards={savedCards} />}
              />
              <Route path="/movies" element={ <ProtectedRouteElement
                  element={Movies} cards={cards} />} />

              <Route path="/profile" element={<ProtectedRouteElement
                  element={Profile} user={currentUser} />} />
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
