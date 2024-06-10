import React, { useState} from "react";

const Dailogue = ({ show, onQuit, onNextRound, Winner}) => {

    if (!show) {
        return null;
    }

    return (
        <div className="dailogue-overlay">
            <div className="dailogue-content">
                <p>{Winner ? `${Winner} WINS`: null}</p>
                <h2>{Winner ? `${Winner} TAKES THE ROUND` : "ROUND TIED"}</h2>
                <button onClick={onQuit}>QUIT</button>
                <button onClick={onNextRound}>NEXT ROUND</button>
            </div>
        </div>
    )

}

export default Dailogue;