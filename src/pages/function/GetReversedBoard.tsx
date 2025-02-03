import { cellType, directions } from '../constant';
import { getOppositeCellType, isOutOfBoard } from '../lib';

export const getReversedBoard = (
  currentX: number,
  currentY: number,
  board: number[][],
  currentTurn: number,
): number[][] => {
  const reversedBoard = structuredClone(board);

  directions.map((d) => {
    let x = d[0] + currentX;
    let y = d[1] + currentY;

    if (isOutOfBoard(x, y)) return;

    if (board[y][x] === getOppositeCellType(currentTurn)) {
      const reverseCell: number[][] = findReversibleCells(x, y, d, board, currentTurn);

      reverseCell.map(([y, x]) => {
        reversedBoard[y][x] = currentTurn;
      });
    }
  });
  return reversedBoard;
};

const findReversibleCells = (
  x: number,
  y: number,
  d: number[],
  board: number[][],
  currentTurn: number,
): number[][] => {
  //すでに[y , x]が格納されているのは、
  //この関数が呼び出される前に currentTurnと異なるコマがあることが確定しているため
  let reverseCell: number[][] = [[y, x]];

  while (true) {
    x += d[0];
    y += d[1];

    //型エラーが出るので、配列を返す
    if (isOutOfBoard(x, y)) return [];

    //空白のセルに到達したら、ひっくり返せないので空の配列を返す
    if (board[y][x] === cellType.empty) {
      return [];
    }

    //自分のコマに到達したら、ひっくり返せるので、ひっくり返すセルの配列を返す
    if (board[y][x] === currentTurn) {
      break;
    }
    //相手のコマが続く場合は、ひっくり返すセルの配列に追加
    else if (board[y][x] === getOppositeCellType(currentTurn)) {
      reverseCell.push([y, x]);
    }
  }

  return reverseCell;
};
