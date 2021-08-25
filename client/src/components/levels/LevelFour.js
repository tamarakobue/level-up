import React, { useState, useEffect } from 'react'
import GameOver from '../GameOver'
import divide from '../../images/levels/divide.jpg'

const LevelFour = (props) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [remainder, setRemainder] = useState(0);
    const [score, setScore] = useState(0);
    const [counter, setCounter] = useState(8)
    const [levelId, setLevelId] = useState(0)
    const [scoreId, setScoreId] = useState(0)
    // const [levelDifficulty, setLevelDifficulty] = useState('')
    const [currentScore, setCurrentScore] = useState(0)
    const [toggleGameOver, setToggleGameOver] = useState(false)
    let updatedScore = 0


    const calculateLevelDiff = () => {
        let level = ''
        if (updatedScore < 45) {
            level = 'Easy'
        } else if (updatedScore >= 45 && updatedScore < 90) {
            level = 'Medium'
        } else if (updatedScore >= 90 && updatedScore < 135) {
            level = 'Hard'
        } else {
            level = 'Expert'
        }
        return level;
    }

    
    const startTimer = () => {
        const timer =
            counter > 0 && setTimeout(() => setCounter(counter - 1), 2000);
        return () => clearInterval(timer);
    }

    const submit = (e) => {
        e.preventDefault();
        const formValid = +remainder >= 0;
        if (!formValid) {
        return;
        }
        if (+num1 / +num2 === +remainder) {
        setScore((score) => score + 5);
        }
        generateQuestion();
        startTimer();
        if (counter === 0) {
            setCurrentScore(props.user.scores[0].points)
            updatedScore = currentScore + score
             handleScoreUpdate()
        }
        
    }
    
    const generateQuestion = () => {
        setNum1(Math.ceil(Math.random() * 10));
        setNum2(Math.ceil(Math.random() * 10));
    }

    const handleScoreUpdate = () => {
    
        const headerConfig = { 
             method: 'PATCH', 
             headers: { 
                 'Content-Type': 'application/json', 
                 'Accept': 'application/json' 
             }, 
             body: JSON.stringify({
                 points: updatedScore,
                 level_attributes:  {
                    level_difficulty: calculateLevelDiff()
                }
             })}
          
        fetch(`/levels/${props.user.levels[0].id}/scores/${props.user.scores[0].id}`, headerConfig)
         .then(response => response.json())
         
         .then(data => {
             console.log('update fetch', data)
         })
 
         setToggleGameOver(true)
     }
     
    
    return (
        <div className='game-container'>
            <div>
                <img src={divide} alt='divide'/>
                <h4>Time Remaining: {counter} </h4>
            </div>
        <form className='level-one-form' onSubmit={submit}>
            <div>
            <label className='equation'>{num1} / {num2}</label>
            <br/>
            <input value={remainder} onChange={(e) => setRemainder(e.target.value)} />
            </div>
            <button type="submit">check</button>
        </form>
        {toggleGameOver ?  <GameOver finalScore={updatedScore}/> : <button type="button" onClick={generateQuestion}>start game</button>}
        <p>score: {score}</p>
        
        </div>
    );
}
export default LevelFour