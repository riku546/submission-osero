
import { Card, Grid, styled } from '@mui/material';
import styles from './index.module.css';

const StyledCard = styled(Card)({
  width: 'fit-content',
  maxWidth: '100%',
});

const StyledGrid = styled(Grid)({
  justifyContent: 'stretch',
});

const Board = ({ pointCount, board, setBoard, turn, setTurn, direction ,validMoves}) => {



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
      // console.log(localChangePoint);
    });
    // console.log(result);
    return result;
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
  // if (!validMoves){
  //   return;
  // }else{

  //   const newValidMoves = [...validMoves]
  // }

  return (
    <>
      <StyledCard square>
        {board.map((row, rowIndex) => (
          <StyledGrid container justifyContent="stretch" key={rowIndex}>
            {row.map((col, colIndex) => (
              <div
                className={styles.cell}
                onClick={() => clickBoard(rowIndex, colIndex)}
                key={colIndex}
                // style={{background: validMoves.some((move)=>{
                //   rowIndex===move[0] && colIndex=== move[1] ? "blue" : "rgb(7, 110, 86)"
                // })}}
                style={{
                  background: (validMoves as number[][]).some((move:number[]) => move[0] === rowIndex && move[1] === colIndex) ? "blue" : "rgb(7, 110, 86)"
                }}
              >
                {/* <div style={{background:"black"}}> */}
                {col !== 0 && (
                  <div
                    className={styles.stone}
                    style={{
                      background: col === 1 ? 'black' : 'white',
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

export default Board;
