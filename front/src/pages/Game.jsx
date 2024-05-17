import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  rollDice,
  toggleDiceSelection,
  resetDiceSelection,
} from "../store/yamsSlice";
import { Link } from "react-router-dom";
import Dice from "../components/Dice";
import { useGetMeQuery, useGetPastriesQuery } from "../features/pastry";
import Rules from "../components/Rules";

const Game = () => {
  const { dice, rollsLeft, selectedDice, scores } = useSelector(
    (state) => state.yams
  );
  const dispatch = useDispatch();
  // Used to prevent dice from romlling if their is no rolls left
  const [isRolling, setIsRolling] = useState(false);

  // Checck if there is any rolls left
  const rollSelectedDice = () => {
    if (rollsLeft > 0) {
      setIsRolling(true);
      dispatch(rollDice());
      setTimeout(() => {
        setIsRolling(false);
        // Reset the selection of dices
        dispatch(resetDiceSelection());
      }, 1200); // Adjust time based on your animation needs
    }
  };

  // equivalent de useMe
  const { data: me, error: meError, isLoading: meIsLoading } = useGetMeQuery();

  return (
    <>
      <div className="game-wrapper background-image-wrapper">
        {/* <h2 className="">
          <strong>Bonjour {me ? me.name : ""} ! </strong>{" "}
        </h2> */}
        <div className="dice-wrapper content-wrapper">
          <h1>Yahtzee Pâtisserie</h1>
          <Rules />
          <div className="dice-wrapper content-wrapper">
            <div className="diceList">
              {dice.map((d, i) => {
                const handleDiceClick =
                  rollsLeft < 3
                    ? () => dispatch(toggleDiceSelection(i))
                    : undefined;

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
              <p>
                <u>Lancers restants: {rollsLeft} </u>
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
      </div>
    </>
  );
};

export default Game;
