import React, { useState} from "react";

const StartScreen = ({ onStartGame}) => {

    const [playerChoice, setPlayerChoice] = useState(null);

    const handlePlayerChoice = (choice) => {

        setPlayerChoice(choice);

    }

    const handleOpponentChoice = (opponentType) => {

        onStartGame(playerChoice, opponentType);
    };
    

    

    return (
        <div className="welcome-screen">
            <h1>PICK PLAYER 1'S MARK</h1>
            <div className="select-player">

                <button onClick={() => handlePlayerChoice('X')}>X</button>
                <button onClick={() => handlePlayerChoice('O')}>O</button>

            </div>
            <div>
                <button onClick={() => handleOpponentChoice('CPU')}>NEW GAME (VS CPU)</button>
                <button onClick={() => handleOpponentChoice('PLAYER')}> NEW GAME (VS PLAYER)</button>

            </div>

        </div>
    )

}

export default StartScreen;