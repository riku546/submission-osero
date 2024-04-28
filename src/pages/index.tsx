import { Card, Grid, styled } from '@mui/material';
import { useState } from 'react';

const StyledCard = styled(Card)({
  width: 'fit-content',
  maxWidth: '100%',
});

const StyledGrid = styled(Grid)({
  justifyContent: 'stretch',
});

const Home = () => {
  const defaultBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const direction = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];

  const [board, setBoard] = useState(defaultBoard);

  const [turn, setTurn] = useState(1);
  const [black, setBlack] = useState(2);
  const [white, setWhite] = useState(2);

  const getReversePoints = (currentX: number, currentY: number) => {
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

      // let localChangePoint = [axisX + currentX, axisY + currentY];
      let localChangePoint = [];
      localChangePoint.push([x, y]);

      // console.log("ff");

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
      console.log(localChangePoint);
    });
    console.log(result);
    return result;
  };

  const pointCount = (board: number[][]) => {
    console.log(board);
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

    setBlack(blackCount.length);
    setWhite(whiteCount.length);
  };

  const clickBoard = (rowIndex: number, colIndex: number) => {
    const newBoard = [...board];
    const reversePoints = getReversePoints(colIndex, rowIndex);
    newBoard[rowIndex][colIndex] = turn;
    // console.log("gg");

    reversePoints.forEach((item) => {
      if (item.length === 0) {
        return;
      } else {
        // console.log(item);
        const x = item[0];
        const y = item[1];
        // console.log(y, x);
        // console.log(turn)
        newBoard[y][x] = turn === 1 ? 1 : 2;
      }
    });
    // console.log(newBoard)
    pointCount(newBoard);
    setBoard(newBoard);
    setTurn(turn === 1 ? 2 : 1);
  };

  return (
    <>
      <h3>Turn:{turn === 1 ? 'black' : 'white'}</h3>
      <h3>black:{black}</h3>
      <h3>white:{white}</h3>
      <StyledCard square>
        {board.map((row, rowIndex) => (
          <StyledGrid container justifyContent="stretch" key={rowIndex}>
            {row.map((col, colIndex) => (
              <div
                onClick={() => clickBoard(rowIndex, colIndex)}
                key={colIndex}
                style={{
                  border: '1px solid #000',
                  backgroundColor: '#3b6a39',
                  aspectRatio: '1 / 1',
                  textAlign: 'center',
                  width: 80,
                  height: 80,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* <div style={{background:"black"}}> */}
                {col !== 0 && (
                  <div
                    style={{
                      background: col === 1 ? 'black' : 'white',
                      width: 60,
                      height: 60,
                      borderRadius: 100,
                    }}
                  />
                )}
              </div>
              // </div>
            ))}
          </StyledGrid>
        ))}
      </StyledCard>
    </>
  );
};

export default Home;
