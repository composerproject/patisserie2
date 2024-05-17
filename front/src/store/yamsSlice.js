import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dice: Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1), // random initial values
  rollsLeft: 3,
  scores: {
    suite: 0,
    carre: 0,
    yams: 0,
  },
  selectedDice: Array(5).fill(true),
};

// Actions for the rest of the code
const yamsSlice = createSlice({
  name: "yams",
  initialState,
  reducers: {
    toggleDiceSelection(state, action) {
      state.selectedDice[action.payload] = !state.selectedDice[action.payload];
    },
    rollDice: handleDiceRoll,
    resetDiceSelection(state) {
      state.selectedDice.fill(true);
    },
  },
});

function handleDiceRoll(state) {
  // Reroll selected dice
  state.dice = state.dice.map((value, index) =>
    state.selectedDice[index] ? Math.floor(Math.random() * 6) + 1 : value
  );

  // Decrement rolls left
  state.rollsLeft -= 1;

  // Calculate scores
  const counts = {};
  state.dice.forEach((num) => (counts[num] = (counts[num] || 0) + 1));

  if (Object.values(counts).includes(5)) {
    state.scores.yams += 1;
  }
  if (Object.values(counts).includes(4)) {
    state.scores.carre += 1;
  }

  const sortedDice = [...state.dice].sort((a, b) => a - b);
  if (
    sortedDice.join(",") === "1,2,3,4,5" ||
    sortedDice.join(",") === "2,3,4,5,6"
  ) {
    state.scores.suite += 1;
  }
}

export const { rollDice, toggleDiceSelection, resetDiceSelection } =
  yamsSlice.actions;

export default yamsSlice.reducer;
