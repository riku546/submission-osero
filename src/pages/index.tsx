import { useEffect, useReducer, useState } from 'react';
import Board from './Board';
import MatchInfo from './MatchInfo';
import styles from './index.module.css';
import { findValidMoves } from './function/FindValidMoves';

const Home = () => {
  const defaultBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const direction = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];

  const reduer = (skipRest) => {
    if (skipRest === 1) {
      window.location.reload();
    }
    setTurn((prev) => 3 - prev);
    return skipRest + 1;
  };

  const [board, setBoard] = useState(defaultBoard);
  const [turn, setTurn] = useState(1);
  const [black, setBlack] = useState(2);
  const [white, setWhite] = useState(2);
  const [skipRest, dispatch] = useReducer(reduer, 0);
  const [validMoves , setValidMoves] = useState([])

  useEffect(() => {
    const result = findValidMoves(board, direction, turn);
    // console.log(result)
    setValidMoves(result)
  }, [board]);

  
  const pointCount = (board: number[][]) => {
    const blackCount = [];
    const whiteCount = [];

    board.map((b) => {
      b.map((i) => {
        if (i === 1) {
          blackCount.push(i);
        } else if (i === 2) {
          whiteCount.push(i);
        }
      });
    });

    setBlack(blackCount.length);
    setWhite(whiteCount.length);
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        <MatchInfo
          black={black}
          white={white}
          turn={turn}
          skipRest={skipRest}
          dispatch={dispatch}
        />
        <Board
          pointCount={pointCount}
          board={board}
          setBoard={setBoard}
          turn={turn}
          setTurn={setTurn}
          direction={direction}
          validMoves={validMoves}
        />
      </div>
    </div>
  );
};

export default Home;
