import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const GameOver = ({ finalScore, toggle }) => {
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("updated user score", data);
      });
  }, []);

  if (finalScore < 45) {
    return (
      <div className="game-container">
        <h1>Oh, No. Time is up. Better luck next time.</h1>
        <p>Your Final Score is: {finalScore}! You must get a total of 45 points to move to next level.</p>
        <button className='button-warning pure-button' onClick={toggle}>Try Again</button>
      </div>
    );
  } else {
    return (
      <div className="game-container">
        <h1>Yay! You won!</h1>
        <p>Your Final Score is: {finalScore}! Way to Go!.</p>
        <button className='button-warning pure-button' onClick={toggle}>Next Level</button>
      </div>
    );
  }
};
export default GameOver;
