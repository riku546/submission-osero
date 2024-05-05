import React from 'react';

const MatchInfo = ({ black, white, turn }) => {
  return (
    <div style={{ display: 'flex', color: 'white' }}>
      <div style={{ marginRight: 30 }}>
        <h3>Turn: {turn === 1 ? 'black' : 'white'}</h3>
        <h3>black: {black}</h3>
        <h3>white: {white}</h3>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button onClick={() => window.location.reload()} style={{ padding: 10, borderRadius: 15 }}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default MatchInfo;
