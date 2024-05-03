export const pointCount = (board: number[][]) => {
    const blackCount = [];
    const whiteCount = [];

    board.map((b) => {
      b.map((i) => {
        if (i === 1) {
          blackCount.push(i);
        } else if (i === 2) {
          whiteCount.push(i);
        }
      });
    });

    return [blackCount.length , whiteCount.length]
  };