import React from "react";
import './Dialogue.css'
import xLogo from '../../assets/icon-x.svg';
import oLogo from '../../assets/icon-o.svg';

const Dialogue = ({ winner, onNextRound, onQuit, opponent, playerChoice }) => {
    const getMessage = () => {
        if (winner === "Tie") {
            return "";
        } else if (opponent === "CPU" && playerChoice === 'O') {
            return winner === "X" ? "OH NO,YOU LOST!" : "YOU WON!";
        } else if (opponent === "CPU" && playerChoice === 'X'){
            return winner === "X" ? "YOU WON!" : "OH NO, YOU LOST!" ;

        }else {
            return `Player ${winner === "X" ? "1" : "2"} wins!`;
        }
    };

    return (
      <article>
            <div className="overlay"></div>
            <div className="dialogue">
                <div className="dialogue-content">
                    <p className="winner-loser-message">{getMessage()}</p>
                    <p className="winner-of-round" style={{color:  winner === 'X' ? '#31C3BD' : winner === 'O' ? '#F2B137' : '#A8BFC9'}}>
                        {winner === 'X'  ? (
                            <>
                                <img className="winner-of-round-xlogo" src={xLogo} alt="" />
                                TAKES THE ROUND
                            </> 
                        ) : winner === 'O' ? (
                            <>
                                <img className="winner-of-round-ologo" src={oLogo} alt="" />
                                TAKES THE ROUND
                            </>
                        ) : (
                            'ROUND TIED'
                        )}
                    </p>
                    <button className="quit-button" onClick={onQuit}>QUIT</button>
                    <button className="nextround-button" onClick={onNextRound}>Next Round</button>
                </div>
            </div>
      </article>
    );
};

export default Dialogue;
