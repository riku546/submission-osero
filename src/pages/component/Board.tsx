import { Card, Grid, styled } from '@mui/material';
import styles from '../index.module.css';

const StyledCard = styled(Card)({
  width: 'fit-content',
  maxWidth: '100%',
});

const StyledGrid = styled(Grid)({
  justifyContent: 'stretch',
});

const Board = ({ board, clickBoard, validMoves }) => {


  return (
    <>
      <StyledCard square style={{backgroundColor:"#0f1214"}}>
        {board.map((row: number[], rowIndex: number) => (
          <StyledGrid container justifyContent="stretch" key={rowIndex}>
            {row.map((col: number, colIndex: number) => (
              <div
                className={styles.cell}
                onClick={() => clickBoard(rowIndex, colIndex)}
                key={colIndex}
                style={{
                  background: (validMoves as number[][]).some(
                    (move: number[]) => move[0] === rowIndex && move[1] === colIndex,
                  )
                    ? '#273037'
                    : '#0c0f11',
                }}
              >
                {col !== 0 && (
                  <div
                    className={styles.stone}
                    style={{
                      background: col === 1 ? 'green' : 'white',
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
