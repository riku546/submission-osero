import { direction } from '../constant';
import { isOutOfBoard } from '../lib';

export const getReversedBoard = (
  currentX: number,
  currentY: number,
  board: number[][],
  currentTurn: number,
) => {
  const result: number[][] = [];

  direction.forEach((d) => {
    let x = d[0] + currentX;
    let y = d[1] + currentY;

    if (isOutOfBoard(x, y)) return;

    const cellStatus = board[y][x];

    if (cellStatus === 0) return;
    if (cellStatus === currentTurn) return;

    let localChangePoint: number[][] = [];
    localChangePoint.push([x, y]);

    while (true) {
      x += d[0];
      y += d[1];

      if (isOutOfBoard(x, y)) return;

      const pointStatus = board[y][x];

      if (pointStatus === 0) {
        localChangePoint = [];
        break;
      } else if (pointStatus === currentTurn) {
        break;
      } else {
        localChangePoint.push([x, y]);
      }
    }
    result.push(...localChangePoint);
  });
  return result;
};
