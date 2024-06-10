import React from "react";
import '../Square/Square.css'



const Square = ({value, onSquareClick, xImage, oImage}) => {

   
        
    return (
        <button className="square" onClick={onSquareClick}>
            {value === "X" && <img src={xImage} alt="X"/>}
            {value === "O" && <img src={oImage} alt="O"/>}
        </button>
    )
   
}

export default Square;