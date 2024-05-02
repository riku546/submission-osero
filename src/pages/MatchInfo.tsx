import React from 'react';

const MatchInfo = ({ black, white, turn, skipRest, dispatch  }) => {
  return (
    <div style={{display:"flex"}}>
        <div style={{marginRight:30}}>

      <h3>Turn: {turn === 1 ? 'black' : 'white'}</h3>
      <h3>black: {black}</h3>
      <h3>white: {white}</h3>
        </div>
      <div>
        <div style={{display:"flex" , alignItems:"center"}}>

        <button
          onClick={() => {
            dispatch();
          }}
          style={{height:20,  }}
        >
          skip
        </button>
        <h4>skipRest: {skipRest}</h4>
        </div>
        <button onClick={()=> window.location.reload()}>Restart</button>
      </div>
    </div>
  );
};

export default MatchInfo;
