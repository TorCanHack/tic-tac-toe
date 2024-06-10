import React, { useState, useEffect, useCallback } from "react";
import Square from "../Square/Square";
import xLogo from '../../assets/icon-x.svg';
import oLogo from '../../assets/icon-o.svg';

const Board = ({ opponent }) => {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);
    const [ties, setTies] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);



    const makeCpuMove = useCallback(() => {
        const newSquares = squares.slice();
        const availableIndices = newSquares.map((square, index) => square == null ? index : null).filter(val => val != null);

        if (availableIndices.length > 0) {
            const cpuMoveIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
            newSquares[cpuMoveIndex] = xIsNext ? "X" : "O";
            setSquares(newSquares);
            setXIsNext(!xIsNext);
        }
    }, [squares, xIsNext]);

    useEffect(() => {
        
        if (opponent === 'CPU' && !xIsNext && !calculateWinner(squares)) {
            // Delay the CPU move to simulate thinking time and avoid instant moves
            const timeoutId = setTimeout(() => {
                makeCpuMove();
            }, 1000); // 1 second delay
    
            // Clear the timeout if the component unmounts to avoid memory leaks
            return () => clearTimeout(timeoutId);
        }
    }, [xIsNext, squares, opponent, makeCpuMove]);

    useEffect(() => {
        
    })
    

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

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

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : 'O');
    }


   
    
    return (
        <>
            <div className="status">{status}</div>
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
     
            
       
        </>
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