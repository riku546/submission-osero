export const CalcPoint = (board: number[][]) => {
  const blackCell: number[] = board.flatMap((b) => b.filter((i) => i === 1));
  const whiteCell: number[] = board.flatMap((b) => b.filter((i) => i === 2));

  return [blackCell.length, whiteCell.length];
};
