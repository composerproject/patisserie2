import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home";
import "./index.css";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Link } from "react-router-dom";
import { useState } from "react";
import useMe from "./hooks/useMe";

const App = () => {
  // useMe();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
      <div className="global-wrapper">
        <div className="nav-toggle-button" onClick={toggleNavigation}>
          <img src="../public/bars-red.svg" alt="" />
        </div>
        <nav className={isOpen ? "open" : "closed"}>
          <h1 className="main-title">Gourmandise</h1>
          <ul>
            <Link to="/">
              <li>Accueil</li>
            </Link>
            <Link to="/game">
              <li>Jeu</li>
            </Link>
            <Link to="/about">
              <li>À propos</li>
            </Link>
            <Link to="/contact">
              <li>Contact</li>
            </Link>
          </ul>
        </nav>
        <div className="main-wrapper">
          {/* <img className="hero" src="../public/img-pat-2.jpg" alt="" /> */}
          <Routes>
            <Route path="/" exact element={<Home />} />{" "}
            <Route path="/game" element={<Game />} />{" "}
            <Route path="/results" element={<Results />} />{" "}
            <Route path="/login" element={<Login />} />{" "}
            <Route path="/admin" element={<Admin />} />{" "}
            <Route path="/about" element={<About />} />{" "}
            <Route path="/contact" element={<Contact />} />{" "}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
