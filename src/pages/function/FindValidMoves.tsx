import { direction } from '../constant';

export const findValidMoves = (board: number[][], turn: number) => {
  const resultMoves: number[][] = [];
  board.map((row, y) => {
    row.map((s, x) => {
      const temporyMoves: number[][] = [];
      if (s !== 0) return;
      direction.map((row) => {
        let moveX = x + row[0];
        let moveY = y + row[1];
        if (moveY < 0 || moveY > 7) return;
        if (moveX < 0 || moveX > 7) return;

        if (board[moveY][moveX] === 0) {
          return;
        } else if (board[moveY][moveX] === turn) {
          return;
        } else {
          temporyMoves.push([y, x]);
          while (true) {
            moveX += row[0];
            moveY += row[1];

            if (moveY < 0 || moveY > 7) break;
            if (moveX < 0 || moveX > 7) break;

            if (board[moveY][moveX] === 0) {
              break;
            } else if (board[moveY][moveX] === turn) {
              if (!temporyMoves) {
                break;
              } else {
                resultMoves.push([y, x]);
                temporyMoves;
                break;
              }
            } else {
              temporyMoves.push([y, x]);
            }
          }
        }
      });
    });
  });
  return resultMoves;
};
