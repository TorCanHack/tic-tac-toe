import React, {useState} from "react";
import './Square.css'
import xhoverimg from '../../assets/icon-x-outline.svg'
import ohoverimg from '../../assets/icon-o-outline.svg'



const Square = ({value, onSquareClick, xImage, oImage, xIsNext, isWinningSquare, winningPlayer}) => {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const dynamicStyles = () => {
        if (value === null && isHovered) {
          return xIsNext ? { backgroundImage: `url(${xhoverimg})` } : { backgroundImage: `url(${ohoverimg})`};
        }
        return {};
    };

    const style = {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        ...dynamicStyles()
    };

    let className = 'square'
    if (isWinningSquare) {
        className += winningPlayer === 'X' ? " winning-square-x" : " winning-square-o";
    }

    let classNameImg = ''
    if (isWinningSquare) {
        classNameImg = "dark-square";
    }

        
    return (
        <button className={className} onClick={onSquareClick} style={style} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            {value === "X" && <img className={classNameImg} src={xImage} alt="X"/>}
            {value === "O" && <img className={classNameImg} src={oImage} alt="O"/>}
        </button>
    )
   
}

export default Square;