import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home"; // Vérifie le chemin ici
import './index.css';
import Results from "./pages/Results";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Jeu de Yams</h1>
        <Routes>
          <Route path="/" exact element={<Home />} />{" "}
          <Route path="/game" element={<Game />} />{" "}
          <Route path="/results" element={<Results />} />{" "}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
