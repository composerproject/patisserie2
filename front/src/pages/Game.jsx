import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { rollDice, toggleDiceSelection, resetDiceSelection } from "../store/yamsSlice";
import { Link } from "react-router-dom"; 
import Dice from "../components/Dice";

const Game = () => {
  const { dice, rollsLeft, selectedDice, scores } = useSelector((state) => state.yams);
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

  console.log(scores);
  console.log(dice);


  return (
    <div>
      <div className="diceList">
        {dice.map((d, i) => {
          // Determine the onClick function based on the game state
          // const handleDiceClick = rollsLeft < 3 ? () => dispatch(toggleDiceSelection(i)) : undefined;
          const handleDiceClick = rollsLeft < 50 ? () => dispatch(toggleDiceSelection(i)) : undefined; //test

          return (
            <div key={i} onClick={handleDiceClick}
                 style={{ border: selectedDice[i] ? '2px solid green' : 'none', cursor: 'pointer' }}>
              <Dice number={d} rolling={isRolling && selectedDice[i]} />
            </div>
          );
        })}
      </div>
      <div>Lancers restants: {rollsLeft}</div>
      <button onClick={rollSelectedDice} disabled={rollsLeft === 0}>
        Lancer les dés
      </button>
      <Link to="/results">
        <button>
          Voir le résultat
        </button>
      </Link>
    </div>
  );
};

export default Game;
