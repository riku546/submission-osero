import Board from './component/Board';
import MatchInfo from './component/MatchInfo';
import { cellType, initialBoard } from './constant';
import { findValidMoves } from './function/FindValidMoves';
import { getReversedBoard } from './function/GetReversedBoard';
import styles from './index.module.css';
import { useEffect, useState } from 'react';

const Home = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentTurn, setCurrentTurn] = useState(cellType.black);
  const [validMoves, setValidMoves] = useState<number[][]>([]);

  useEffect(() => {
    const result = findValidMoves(board, currentTurn);
    setValidMoves(result);
  }, [board]);

  const clickBoard = (rowIndex: number, colIndex: number) => {
    //すでにコマが置かれている場合は何もしない
    if (board[rowIndex][colIndex] !== cellType.empty) {
      return;
    }

    const newBoard = [...board];
    newBoard[rowIndex][colIndex] = currentTurn;

    const reversePoints: number[][] = getReversedBoard(colIndex, rowIndex, board, currentTurn);

    reversePoints.map(([x, y]) => {
      newBoard[y][x] = currentTurn;
    });

    setBoard(newBoard);
    //currentTurnを逆の値にする
    setCurrentTurn(currentTurn === cellType.black ? cellType.white : cellType.black);
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
