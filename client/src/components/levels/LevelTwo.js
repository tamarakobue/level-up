import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import GameOver from '../GameOver'
import subtract from '../../images/levels/subtract.jpg'


const LevelTwo = (props) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [remainder, setRemainder] = useState(0);
    const [score, setScore] = useState(0);
    const [counter, setCounter] = useState(8)
    const [levelId, setLevelId] = useState(0)
    const [scoreId, setScoreId] = useState(0)
    const [finalScore, setFinalScore] = useState(0)
    const [levelDifficulty, setLevelDifficulty] = useState('')
    const [currentScore, setCurrentScore] = useState(0)
    const [toggleGameOver, setToggleGameOver] = useState(false)
    const history = useHistory()

    const submit = (e) => {
        e.preventDefault();
        const formValid = +remainder >= 0;
        if (!formValid) {
        return;
        }
        if (+num1 - +num2 === +remainder) {
        setScore((score) => score + 5);
        }
        generateQuestion();
        startTimer();
    }

    const startTimer = () => {
        const timer =
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }
    

    const generateQuestion = () => {
        setNum1(Math.ceil(Math.random() * 10));
        setNum2(Math.ceil(Math.random() * 10));
  }

  const handleScoreUpdate = (scoreId) => {
    setScoreId(props.user.scores[0].id)
    console.log('score id', scoreId) 
    setLevelId(props.user.levels[0].id)
    setCurrentScore(props.user.scores[0].points)
    setFinalScore(currentScore + score)
    if (finalScore === 90) {
        setLevelDifficulty('Hard')
    }
    if (finalScore < 90 && finalScore > 45) {
        setLevelDifficulty('Medium')
    } 
    const headerConfig = { 
         method: 'PATCH', 
         headers: { 
             'Content-Type': 'application/json', 
             'Accept': 'application/json' 
         }, 
         body: JSON.stringify({
             points: finalScore,
             level_difficulty: levelDifficulty
         })}
      
        fetch(`http://localhost:3001/levels/${levelId}/scores/${scoreId}`, headerConfig)
        .then(response => response.json())
        
        .then(data => {
            console.log('update fetch', data)
        })

        setToggleGameOver(true)
    }
    
    
    if (score === 90 || counter === 0) {
        return handleScoreUpdate()
        // setToggleGameOver(true)
    }
    
    return (
        <div className='game-container'>
            <div>
                <img src={subtract} alt='subtract'/>
                <h4>Time Remaining: {counter} </h4>
            </div>
        <form className='level-one-form' onSubmit={submit}>
            <div>
            <label className='equation'>{num1} - {num2}</label>
            <br/>
            <input value={remainder} onChange={(e) => setRemainder(e.target.value)} />
            </div>
            <button type="submit">check</button>
        </form>
        {toggleGameOver ?  <GameOver /> : <button type="button" onClick={generateQuestion}>start game</button>}
        <p>score: {score}</p>
        <button className='button-warning pure-button' onClick={props.toggle}>Back to Dashboard</button>
        </div>
    );
}
export default LevelTwo