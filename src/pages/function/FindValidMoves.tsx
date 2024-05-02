export const findValidMoves = (board, direction, turn) => {
  const resultMoves = [];
  board.map((row, y) => {
    row.map((s, x) => {
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
          while (true) {
            moveX += row[0];
            moveY += row[1];

            if (board[moveY][moveX] === 0) {
              return;
            } else if (board[moveY][moveX] === turn) {
              resultMoves.push([y, x]);
            } else {
              return;
            }
          }
        }
      });
    });
  });
  return resultMoves;
};
