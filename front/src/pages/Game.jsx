import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  rollDice,
  toggleDiceSelection,
  resetDiceSelection,
} from "../store/yamsSlice";
import { Link } from "react-router-dom";
import Dice from "../components/Dice";

const Game = () => {
  const { dice, rollsLeft, selectedDice, scores } = useSelector(
    (state) => state.yams
  );
  const dispatch = useDispatch();
  const [isRolling, setIsRolling] = useState(false); // State to control dice rolling

  const rollSelectedDice = () => {
    if (rollsLeft > 0) {
      setIsRolling(true); // Enable rolling
      dispatch(rollDice());
      setTimeout(() => {
        setIsRolling(false);
        dispatch(resetDiceSelection()); // Reset selection after roll
      }, 1200); // Adjust time based on your animation needs
    }
  };

  return (
    <div className="game-wrapper">
      <div className="diceWrapper content-wrapper">
        <div className="diceList">
          {dice.map((d, i) => {
            const handleDiceClick =
              rollsLeft < 50
                ? () => dispatch(toggleDiceSelection(i))
                : undefined; //test

            return (
              <div
                key={i}
                onClick={handleDiceClick}
                className={`dice ${selectedDice[i] ? "selected" : ""}`}
              >
                <Dice number={d} rolling={isRolling && selectedDice[i]} />
              </div>
            );
          })}
        </div>
        <div>
          {" "}
          <p>
            {" "}
            <u>Lancers restants: {rollsLeft} </u>{" "}
          </p>
        </div>
        <div className="game-button-wrapper">
          <button onClick={rollSelectedDice} disabled={rollsLeft === 0}>
            Lancer les dés
          </button>
          <Link to="/results">
            <button>Voir le résultat</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Game;
