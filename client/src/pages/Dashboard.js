import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ToggleLevels from "../components/ToggleLevels";
import LevelOne from "../components/levels/LevelOne";
import LevelTwo from "../components/levels/LevelTwo";
import LevelThree from "../components/levels/LevelThree";
import LevelFour from "../components/levels/LevelFour";

const Dashboard = ({ user, handleLogout, loggedIn }) => {
  const history = useHistory();

  console.log('current user', user)

  if (loggedIn === true) {
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
          <button className="button-warning pure-button" onClick={handleLogout}>
            Logout
          </button>

          {/* CURRENT USER SCORE */}
          <p>Current Score: {user.scores[0].points}</p>
          <hr className="spacer" />

          

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
            {/* GREETING */}
            <div className="greeting">
              <h1 className="logo-main">Level Up!</h1>
              <h4>MATH LEARNING GAME</h4>
              <br />
              <h1>Hello, {user.username}!</h1>
              <h4>Are you ready to level up on your Math Skills?</h4>
            </div>

            {/* LEVELS */}
            <div className="level">
              <ToggleLevels>
                {({ on, toggle }) => (
                  <div>
                    {on && (
                      <div toggle={toggle}>
                        {user.levels[0].level_difficulty === "Easy" ? (
                          user.levels.map((l) => (
                            <LevelOne
                              key={l.id}
                              currentLevelDifficulty={l.level_difficulty}
                              toggle={toggle}
                              user={user}
                            />
                          ))
                        ) : (
                          <p></p>
                        )}

                        {user.levels[0].level_difficulty === "Medium" ? (
                          user.levels.map((l) => (
                            <LevelTwo
                              key={l.id}
                              currentLevelDifficulty={l.level_difficulty}
                              toggle={toggle}
                              user={user}
                            />
                          ))
                        ) : (
                          <p></p>
                        )}

                        {user.levels[0].level_difficulty === "Hard" ? (
                          user.levels.map((l) => (
                            <LevelThree
                              key={l.id} id={l.id}
                              currentLevelDifficulty={l.level_difficulty}
                              toggle={toggle}
                              user={user}
                            />
                          ))
                        ) : (
                          <p></p>
                        )}

                        {user.levels[0].level_difficulty === "Expert" ? (
                          user.levels.map((l) => (
                            <LevelFour
                              key={l.id}
                              currentLevelDifficulty={l.level_difficulty}
                              toggle={toggle}
                              user={user}
                            />
                          ))
                        ) : (
                          <p></p>
                        )}
                      </div>
                    )}
                    <button onClick={toggle}>BEGIN</button>
                  </div>
                )}
              </ToggleLevels>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    history.push("/login");
  }
};

export default Dashboard
