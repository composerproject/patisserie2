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

  const { data: me, error : meError, isLoading : meIsLoading } = useGetMeQuery();
 



  const handleGetMe = async () => {
    console.log("handle get me");
    me? console.log(me) : console.log("no me");
//     try {
//       const me = await me().unwrap();
//       // console.log(me); 
//       // const result = await login({ email, password }).unwrap();
//       // dispatch(changeloggedIn(true));
//       // Assuming a successful login redirects to '/dashboard'
//       // navigate('/admin');
//     } catch (error) {
// console.log("error get me failed", error);
//       // console.error('get me failed:', error);
//       // Handle error, e.g., show an error message
//     }
  }

  return (
    <>
    {/* <button onClick={handleGetMe}>Get Me Query</button> */}
    <h2>Bonjour {me? me.name : ""} ! </h2>
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
    </>
  );
};

export default Game;
