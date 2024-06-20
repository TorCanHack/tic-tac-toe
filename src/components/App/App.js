import React, { useEffect, useState, useCallback} from 'react';
import Board from '../Board/Board';
import './App.css';
import StartScreen from '../StartScreen/StartScreen';
import Dialogue from '../Dialogue/Dialogue';

function App() {

  const [gameStarted, setGameStarted] = useState(false);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [xIsNext, setXIsNext] = useState(true);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [ties, setTies] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [restart, setRestart] = useState(false);

  const startGame = (choice, opponentType) => {
    setPlayerChoice(choice);
    setOpponent(opponentType);
    setGameStarted(true);
    setXIsNext(true);
  }


  const handleGameEnd = (winner) => {
    setGameOver(true);
    setWinner(winner);
    if (winner === 'X') {
      setXWins(xWins +1)
    } else if (winner === 'O') {
      setOWins(oWins +1)
    } else {
      setTies(ties + 1);
    }
  };

  const makeCpuMove = useCallback(() => {
    const newSquares = squares.slice();
    const availableIndices = newSquares.map((square, index) => square === null ? index : null).filter(val => val !== null);

    if (availableIndices.length > 0) {
        const cpuMoveIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        newSquares[cpuMoveIndex] = xIsNext ? "X" : "O";
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    }
}, [squares, xIsNext, setXIsNext]);

const handleNextRound = () => {
  resetGame();
}


  const handleQuit = () => {
    resetGame()
    setGameStarted(false);
    setXWins(0);
    setOWins(0);
    setTies(0)

  }

  const handleRestart = () => {
    resetGame()
    setXWins(0);
    setOWins(0);
    setTies(0);
    setRestart(true)
  }

  const resetGame = () => {

    setSquares(Array(9).fill(null)); // Clear the board
    setGameOver(false); // Allow for new moves
    setWinner(null); // Reset winner
    // Set the turn to the player who didn't start the previous round
    setXIsNext(true);
  }
 
  return (
    <div className="App">
      {!gameStarted ? (<StartScreen onStartGame={startGame}/>) : 
      (<Board opponent={opponent} xIsNext={xIsNext} onGameEnd={handleGameEnd} setXIsNext={setXIsNext} playerChoice={playerChoice} handleRestart={handleRestart} squares={squares} setSquares={setSquares} gameOver={gameOver} setGameOver={setGameOver} makeCpuMove={makeCpuMove} xWins={xWins} oWins={oWins} ties={ties}/>)}
       {gameOver && (
                <Dialogue
                    winner={winner}
                    onNextRound={handleNextRound}
                    onQuit={handleQuit}
                    opponent={opponent}
                    playerChoice={playerChoice}
                />
            )}
            

    </div>
  );
}

export default App;
