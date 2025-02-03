import Board from './component/Board';
import MatchInfo from './component/MatchInfo';
import { findValidMoves } from './function/FindValidMoves';
import styles from './index.module.css';
import { useEffect, useState } from 'react';

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

  const [board, setBoard] = useState(defaultBoard);
  const [turn, setTurn] = useState(1);
  const [validMoves, setValidMoves] = useState<number[][]>([]);

  useEffect(() => {
    const result = findValidMoves(board, direction, turn);
    setValidMoves(result);
  }, [board]);

  return (
    <div className={styles.container}>
      <div>
        <MatchInfo board={board} turn={turn} />
        <Board
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
