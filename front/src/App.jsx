import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home"; // Vérifie le chemin ici
import './index.css';
import Results from "./pages/Results";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import useMe from "./hooks/useMe";

const App = () => {
  useMe();  // Ensures that user authentication is checked on app start
  // console.log(useMe());

  return (
    <Router>
      <div>
        <h1>Jeu de Yams</h1>
        <Routes>
          <Route path="/" exact element={<Home />} />{" "}
          <Route path="/game" element={<Game />} />{" "}
          <Route path="/results" element={<Results />} />{" "}
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/admin" element={<Admin />} />{" "}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
