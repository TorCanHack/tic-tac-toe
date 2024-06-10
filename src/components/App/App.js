import React, { useState} from 'react';
import Board from '../Board/Board';
import './App.css';
import StartScreen from '../StartScreen/StartScreen';

function App() {

  const [gameStarted, setGameStarted] = useState(false);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [opponent, setOpponent] = useState(null);
  

  const startGame = (choice, opponentType) => {
    setPlayerChoice(choice);
    setOpponent(opponentType);
    setGameStarted(true);
  }


  return (
    <div className="App">
      {!gameStarted ? (<StartScreen onStartGame={startGame}/>) : 
      (<Board playerChoice={playerChoice} opponent={opponent}/>)}

    </div>
  );
}

export default App;
