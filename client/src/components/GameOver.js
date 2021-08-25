import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const GameOver = ({ finalScore }) => {
  const history = useHistory()


  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("updated user score", data);
      });
  }, []);

  const root = () => {
    window.location.reload(false)
  }

  if (finalScore < 45) {
    return (
      <div className="game-container">
        <h1>Oh, No. Time is up. Better luck next time.</h1>
        <p>Your Final Score is: {finalScore}! You must get a total of 45 points to move to next level.</p>
        <Link to='/'><button className="button-warning pure-button" onClick={root}>Try Again</button></Link>
      </div>
    );
  } else {
    return (
      <div className="game-container">
        <h1>Yay! You won!</h1>
        <p>Your Final Score is: {finalScore}! Way to Go!.</p>
        <Link to='/'><button className="button-warning pure-button" onClick={history.push('/')}>Next Level</button></Link>
      </div>
    );
  }
};
export default GameOver;
