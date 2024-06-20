import React, { useState} from "react";
import './StartScreen.css'
import xLogo from '../../assets/icon-x.svg';
import oLogo from '../../assets/icon-o.svg';
import logo from '../../assets/logo.svg'


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

            <img className="logo" src={logo} alt=""/>
            
            <div className="select-player">
                <h1>PICK PLAYER 1'S MARK</h1>
                <div className="select-player-box">
                    <button className="X-button" onClick={() => handlePlayerChoice('X')}><img src={xLogo} alt=""/></button>
                    <button className="O-button" onClick={() => handlePlayerChoice('O')}><img src={oLogo} alt=""/></button>
                </div>

                <p>REMEMBER: X GOES FIRST</p>

            </div>
            
            <button className="cpu-button" onClick={() => handleOpponentChoice('CPU')}>NEW GAME (VS CPU)</button>
            <button className="player-button" onClick={() => handleOpponentChoice('PLAYER')}> NEW GAME (VS PLAYER)</button>

            

        </div>
    )

}

export default StartScreen;