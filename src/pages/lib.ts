import { boardSize } from './constant';
import { cellType } from './constant';

//x , yが0 ~ 7(boardSize - 1)の範囲外かどうかを判定
export const isOutOfBoard = (x: number, y: number): boolean => {
  const xLayerIsOut = x < 0 || x >= boardSize;
  const yLayerIsOut = y < 0 || y >= boardSize;
  return xLayerIsOut || yLayerIsOut;
};

//currentTurnを逆の値にする
//black -> white
//white -> black
export const getOppositeCellType = (currentTurn: number): number => {
  return currentTurn === cellType.black ? cellType.white : cellType.black;
};
