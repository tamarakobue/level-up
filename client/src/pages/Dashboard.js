import React, { useState } from "react";
import { Link } from "react-router-dom";
import LevelOne from "../components/levels/LevelOne";
import LevelTwo from "../components/levels/LevelTwo";
import LevelThree from "../components/levels/LevelThree";
import LevelFour from "../components/levels/LevelFour";
import Login from './Login'

const Dashboard = ({ user, loginUser, logoutUser, loggedIn }) => {


  console.log('DASHBOARD current user', user)

  if (user) {
    let userLevel = []
    if (user.levels[0].level_difficulty === 'Easy') {
      userLevel = [
      <LevelOne
        user={user}
      />]
    } else if (user.levels[0].level_difficulty === 'Medium') {
      userLevel = [
      <LevelTwo
        user={user}
      />]
    } else if (user.levels[0].level_difficulty === 'Hard') {
      userLevel = [
      <LevelThree
        user={user}
      />]
    } else if (user.levels[0].level_difficulty === 'Expert') {
      userLevel = [
      <LevelFour
        user={user}
      />]
    }
    return (
      <div className="container">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="logo">
            <Link to="/" className="logo">
              Level Up!
            </Link>
          </div>

          {/* LOGOUT */}
          <button className="button-warning pure-button" onClick={logoutUser}>
            Logout
          </button>

          {/* CURRENT USER SCORE */}
          <p>Current Score: {user.scores[0].points}</p>
          <hr className="spacer" />

          {/* GREETING */}
          <h2>Hello, {user.username}!</h2>
            <h4>Are you ready to level up on your Math Skills?</h4>

          {/* GAME INSTRUCTIONS */}
          <div className="instructions">
            <h3>Instructions:</h3>
            <h4>Object of The Game:</h4>
            <p>Level Up to the TOP Math Expert!</p>
            <h4>Instructions:</h4>
            <p>Complete level one to move to the next level.
                <br/>
                Each correct answer awards 5 points. Earn 45 points in your level to move to the next.
                Can you get to the TOP?
            </p>
          </div>
        </div>

        

        {/* MAIN DASHBAORD */}
        <div className="content">
          <h1 className="title">DASHBOARD</h1>
          <div className="inner-content">

            {/* LEVELS */}
            <div className="level">
            {userLevel}
            
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Login loginUser={loginUser} logoutUser={logoutUser}/>
    )
  }
};

export default Dashboard
