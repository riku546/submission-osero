import { Card, Grid, styled } from '@mui/material';
import styles from '../index.module.css';
import { getReversePoints } from '../function/GetReversePoints';

const StyledCard = styled(Card)({
  width: 'fit-content',
  maxWidth: '100%',
});

const StyledGrid = styled(Grid)({
  justifyContent: 'stretch',
});

const Board = ({ pointCount, board, setBoard, turn, setTurn, direction, validMoves }) => {
  const clickBoard = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex] !== 0) {
      return;
    } else {
      const newBoard = [...board];
      const reversePoints = getReversePoints(colIndex, rowIndex, direction, board, turn);
      newBoard[rowIndex][colIndex] = turn;

      reversePoints.forEach((item) => {
        if (item.length === 0) {
          return;
        } else {
          const x = item[0];
          const y = item[1];
          newBoard[y][x] = turn === 1 ? 1 : 2;
        }
      });
      pointCount(newBoard);
      setBoard(newBoard);
      setTurn(turn === 1 ? 2 : 1);
    }
  };

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
                style={{
                  background: (validMoves as number[][]).some(
                    (move: number[]) => move[0] === rowIndex && move[1] === colIndex,
                  )
                    ? '#708090'
                    : '#444444',
                }}
              >

                {col !== 0 && (
                  <div
                    className={styles.stone}
                    style={{
                      background: col === 1 ? 'black' : 'white',
                    }}
                  />
                )}
              </div>
            ))}
          </StyledGrid>
        ))}
      </StyledCard>
    </>
  );
};

export default Board;
