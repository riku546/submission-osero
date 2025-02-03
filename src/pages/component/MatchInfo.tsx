import React from 'react';
import { CalcPoint } from '../function/CalcPoint';

const MatchInfo = ({ board, turn }) => {
  const [blackCount, whiteCount] = CalcPoint(board);
  return (
    <div style={{ display: 'flex', color: 'white' }}>
      <div style={{ marginRight: 30 }}>
        <h3>Turn: {turn === 1 ? 'black' : 'white'}</h3>
        <h3>black: {blackCount}</h3>
        <h3>white: {whiteCount}</h3>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button
          onClick={() => window.location.reload()}
          style={{
            width: '100px',
            padding: 10,
            borderRadius: 15,
            backgroundColor: '#015cb8',
            border: 'none',
            color: 'white',
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default MatchInfo;
