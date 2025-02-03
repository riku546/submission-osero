import Board from './component/Board';
import MatchInfo from './component/MatchInfo';
import { initialBoard } from './constant';
import { findValidMoves } from './function/FindValidMoves';
import { getReversePoints } from './function/GetReversePoints';
import styles from './index.module.css';
import { useEffect, useState } from 'react';

const Home = () => {
  const [board, setBoard] = useState(initialBoard);

  const [currentTurn, setCurrentTurn] = useState(1);
  const [validMoves, setValidMoves] = useState<number[][]>([]);

  useEffect(() => {
    const result = findValidMoves(board, currentTurn);
    setValidMoves(result);
  }, [board]);

  const clickBoard = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex] !== 0) {
      return;
    }

    const newBoard = [...board];
    newBoard[rowIndex][colIndex] = currentTurn;

    const reversePoints: number[][] = getReversePoints(colIndex, rowIndex, board, currentTurn);

    reversePoints.map(([x, y]) => {
      newBoard[y][x] = currentTurn === 1 ? 1 : 2;
    });

    setBoard(newBoard);
    setCurrentTurn(currentTurn === 1 ? 2 : 1);
  };

  return (
    <div className={styles.container}>
      <div>
        <MatchInfo board={board} turn={currentTurn} />
        <Board board={board} clickBoard={clickBoard} validMoves={validMoves} />
      </div>
    </div>
  );
};

export default Home;
