import { cellType, directions } from '../constant';
import { getOppositeCellType, isOutOfBoard } from '../lib';

export const GetValidMoves = (board: number[][], currentTurn: number): number[][] => {
  const resultMoves: number[][] = [];

  //２重のmapで全てのマスをチェックする
  board.map((row, y) => {
    row.map((s, x) => {
      //すでにコマが置かれている場合はスキップ
      if (s !== cellType.empty) return;

      //全ての方向に対して、コマを置く候補があるかチェックする
      directions.map((row) => {
        checkValidMove(x, y, row, board, currentTurn, resultMoves);
      });
    });
  });

  return resultMoves;
};

const checkValidMove = (
  x: number,
  y: number,
  row: number[],
  board: number[][],
  currentTurn: number,
  resultMoves: number[][],
) => {
  let moveX = x + row[0];
  let moveY = y + row[1];

  if (isOutOfBoard(moveX, moveY)) return;

  //隣のマスが自分のコマまたは、何も置かれていない場合はスキップ
  if (board[moveY][moveX] !== getOppositeCellType(currentTurn)) return;

  while (true) {
    moveX += row[0];
    moveY += row[1];

    if (isOutOfBoard(moveX, moveY)) return;

    //自分のコマに到達したら、y,xは置く候補となるためresultMovesに追加
    if (board[moveY][moveX] === currentTurn) {
      resultMoves.push([y, x]);
      break;
    }
  }
};
