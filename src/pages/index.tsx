import Board from './component/Board';
import MatchInfo from './component/MatchInfo';
import { cellType, initialBoard } from './constant';
import { GetValidMoves } from './function/GetValidMoves';
import { getReversedBoard } from './function/GetReversedBoard';
import styles from './index.module.css';
import { useEffect, useState } from 'react';
import { getOppositeCellType } from './lib';

const Home = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentTurn, setCurrentTurn] = useState(cellType.black);
  const [validMoves, setValidMoves] = useState<number[][]>([]);

  useEffect(() => {
    const result = GetValidMoves(board, currentTurn);
    setValidMoves(result);
  }, [board]);

  const clickBoard = (rowIndex: number, colIndex: number) => {
    //すでにコマが置かれている場合は何もしない
    if (board[rowIndex][colIndex] !== cellType.empty) {
      return;
    }

    const newBoard = [...board];
    //クリックした場所にコマを置く
    newBoard[rowIndex][colIndex] = currentTurn;

    const reversedBoard: number[][] = getReversedBoard(colIndex, rowIndex, board, currentTurn);

    setBoard(reversedBoard);
    setCurrentTurn(getOppositeCellType(currentTurn));
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
