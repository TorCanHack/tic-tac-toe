import React, { useState, useEffect, useCallback } from "react";
import Square from "../Square/Square";
import './Board.css'
import xLogo from '../../assets/icon-x.svg';
import oLogo from '../../assets/icon-o.svg';
import logo from '../../assets/logo.svg';
import restartIcon from '../../assets/icon-restart.svg';

const Board = ({ opponent, xIsNext, setXIsNext, onGameEnd, gameOver, setGameOver, playerChoice, handleRestart, squares, setSquares,makeCpuMove, xWins,oWins, ties }) => {
    
    
    useEffect(() => {

        if (!gameOver && opponent === 'CPU' && ((playerChoice === 'X' && !xIsNext) || (playerChoice === 'O' && xIsNext))){
            const timeoutId = setTimeout(() =>{
                makeCpuMove();
            }, 1000)

            return () => clearTimeout(timeoutId);
        }
           
    }, [xIsNext, opponent, squares, makeCpuMove, playerChoice, gameOver]);

    useEffect(() => {
        const winner = calculateWinner(squares);
        if (winner && !gameOver){
            setGameOver(true)
            onGameEnd(winner);
        } else if (!squares.includes(null) && !gameOver){
            setGameOver(true);
            onGameEnd('Tie');
        }
    }, [squares, onGameEnd, gameOver]);

   

  
    const handleClick = (i) => {
        if (squares[i] || gameOver) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    };


    const renderSquare = (i) => {
        return (
            <Square 
                value={squares[i]}
                onSquareClick={() => handleClick(i)}
                xImage={xLogo}
                oImage={oLogo}
            />
        )
    }

    let status;
    if (!calculateWinner(squares)) {
        status = (
            <div className="status">
                {(xIsNext ? <img className="xlogo-status" src={xLogo} alt=""/> : <img className="ologo-status" src={oLogo} alt=""/>)}
                Turn
            </div>
        )
    }


    
    return (
        <div className="board">
            <div className="XOlogo-status-and-restartLogo">
                <img className="board-logo" src={logo} alt=""/>
                {status}
                <button onClick={() => handleRestart()}><img className="restartIcon" src={restartIcon} alt=""/></button>
            </div>

            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}

            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}

            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}

            </div>
            <div className="scoreboard">
                <p className="x-score">X {playerChoice === 'X' ? "(YOU)" : "(CPU)"} <br/><b>{xWins}</b></p>
                <p className="o-score">O {playerChoice === 'O' ? "(YOU)" : "(CPU)"} <br/><b>{oWins}</b></p>
                <p className="ties">TIES <br/><b>{ties}</b></p>

            </div>
               
        </div>
    )
}

const calculateWinner = (squares) => {
    const lines =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i <lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }

    }

    return null

}

export default Board;