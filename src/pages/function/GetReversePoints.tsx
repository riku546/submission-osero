export const getReversePoints = (
  currentX: number,
  currentY: number,
  direction: number[][],
  board: number[][],
  turn: number,
) => {
  const result: number[][] = [];

  direction.forEach((d) => {
    const axisX = d[0];
    const axisY = d[1];
    let x = axisX + currentX;
    let y = axisY + currentY;

    if (y < 0 || y > 7) return;
    if (x < 0 || x > 7) return;

    const pointStatus = board[y][x];

    if (pointStatus === 0) return;
    if (pointStatus === turn) return;

    let localChangePoint: number[][] = [];
    localChangePoint.push([x, y]);

    while (true) {
      x += axisX;
      y += axisY;

      if (y < 0 || y > 7) return;
      if (x < 0 || x > 7) return;

      const pointStatus = board[y][x];

      if (pointStatus === 0) {
        localChangePoint = [];
        break;
      } else if (pointStatus === turn) {
        break;
      } else {
        localChangePoint.push([x, y]);
      }
    }
    result.push(...localChangePoint);
  });
  return result;
};
