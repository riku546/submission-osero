import { boardSize } from './constant';

//x , yが0 ~ 7(boardSize - 1)の範囲外かどうかを判定
export const isOutOfBoard = (x: number, y: number): boolean => {
  const xLayerIsOut = x < 0 || x >= boardSize;
  const yLayerIsOut = y < 0 || y >= boardSize;
  return xLayerIsOut || yLayerIsOut;
};
