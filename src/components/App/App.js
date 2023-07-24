import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

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
import snapshot from "../../images/snapshot.png";

function App() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: "Анастасия",
    email: "pochta@yandex.ru",
  });
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
                element={<SavedMovies cards={savedCards} />}
              />
              <Route path="/movies" element={<Movies cards={cards} />} />

              <Route path="/profile" element={<Profile user={currentUser} />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<Register />} />
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
