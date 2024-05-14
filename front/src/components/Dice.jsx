import React, { useState, useEffect } from 'react';

const Dice = ({ number, rolling }) => {
  const [displayNumber, setDisplayNumber] = useState(number); // Initialize with the actual number

  useEffect(() => {
    if (!rolling) {
      // When not rolling, ensure the display number is the actual number
      setDisplayNumber(number);
      return;
    }

    let timers = [];
    // Temporarily show random numbers before settling on the actual number
    for (let i = 0; i < 8; i++) {
      timers.push(setTimeout(() => {
        setDisplayNumber(Math.floor(Math.random() * 6) + 1);
      }, i * 150));
    }

    // Finally, set the real number after the "rolling" effect
    timers.push(setTimeout(() => {
      setDisplayNumber(number);
    }, 8 * 150));

    // Clean up the timers when the component unmounts or the number or rolling state changes
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [number, rolling]);

  // Construct the dot elements based on the displayNumber
  const dots = [];
  for (let i = 1; i <= displayNumber; i++) {
    dots.push(<div key={i} className="dot" />);
  }

  return (
    <div className={`dice face-${displayNumber}`}>
      {dots}
    </div>
  );
};

export default Dice;
