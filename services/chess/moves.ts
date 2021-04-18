import { IBoardLimis, IPosition } from '@/shared/interfaces';

const getTopLineSquares = (
  position: IPosition,
  _boardLimis: IBoardLimis,
  n?: number
) => {
  const { x, y } = position;
  const availableBoxes = [];
  const renderBoxsLength = n || x;
  if (x <= 0) {
    return availableBoxes;
  }
  for (let index = 1; index <= renderBoxsLength; index++) {
    availableBoxes.push({
      x: x - index,
      y,
    });
  }
  return availableBoxes;
};

const getBottomLineSquares = (
  position: IPosition,
  boardLimis: IBoardLimis,
  n?: number
) => {
  const { x, y } = position;
  const availableBoxes = [];
  const offset = boardLimis.rows - (x + 1);
  const renderBoxsLength = n || offset;
  if (offset <= 0) {
    return availableBoxes;
  }
  for (let index = 1; index <= renderBoxsLength; index++) {
    availableBoxes.push({
      x: x + index,
      y,
    });
  }
  return availableBoxes;
};

const getRightLineSquares = (
  position: IPosition,
  boardLimis: IBoardLimis,
  n?: number
) => {
  const { x, y } = position;
  const availableBoxes = [];
  const offset = boardLimis.columns - (y + 1);
  const renderBoxsLength = n || offset;
  if (offset <= 0) {
    return availableBoxes;
  }
  for (let index = 1; index <= renderBoxsLength; index++) {
    availableBoxes.push({
      x,
      y: y + index,
    });
  }
  return availableBoxes;
};

const getLeftLineSquares = (
  position: IPosition,
  _boardLimis: IBoardLimis,
  n?: number
) => {
  const { x, y } = position;
  const availableBoxes = [];
  const renderBoxsLength = n || y;
  if (y <= 0) {
    return availableBoxes;
  }
  for (let index = 1; index <= renderBoxsLength; index++) {
    availableBoxes.push({
      x,
      y: y - index,
    });
  }
  return availableBoxes;
};

const getRightTopLineSquares = (
  position: IPosition,
  boardLimis: IBoardLimis,
  n?: number
) => {
  const { x, y } = position;
  const availableBoxes = [];
  const offsetY = boardLimis.columns - (y + 1);
  const offset = x <= offsetY ? x : offsetY;
  const renderBoxsLength = n || offset;
  if (offset <= 0) {
    return availableBoxes;
  }
  for (let index = 1; index <= renderBoxsLength; index++) {
    availableBoxes.push({
      x: x - index,
      y: y + index,
    });
  }
  return availableBoxes;
};

const getLeftTopLineSquares = (
  position: IPosition,
  _boardLimis: IBoardLimis,
  n?: number
) => {
  const { x, y } = position;
  const availableBoxes = [];
  const offset = y <= x ? y : x;
  const renderBoxsLength = n || offset;
  if (offset <= 0) {
    return availableBoxes;
  }
  for (let index = 1; index <= renderBoxsLength; index++) {
    availableBoxes.push({
      x: x - index,
      y: y - index,
    });
  }
  return availableBoxes;
};

const getRightBottomLineSquares = (
  position: IPosition,
  boardLimis: IBoardLimis,
  n?: number
) => {
  const { x, y } = position;
  const availableBoxes = [];
  const offsetY = boardLimis.columns - (y + 1); // get rigth line
  const offsetX = boardLimis.rows - (x + 1); // get bottom line
  const offset = offsetX <= offsetY ? offsetX : offsetY; // get available moves box
  const renderBoxsLength = n || offset;
  if (offset <= 0) {
    return availableBoxes;
  }
  for (let index = 1; index <= renderBoxsLength; index++) {
    availableBoxes.push({
      x: x + index,
      y: y + index,
    });
  }
  return availableBoxes;
};

const getLeftBottomLineSquares = (
  position: IPosition,
  boardLimis: IBoardLimis,
  n?: number
) => {
  const { x, y } = position;
  const offsetX = boardLimis.rows - (x + 1); // get bottom line
  const offset = y <= offsetX ? y : offsetX; //get available moves boxes
  const availableBoxes = [];
  const renderBoxsLength = n || offset;
  if (offset <= 0) {
    return availableBoxes;
  }
  for (let index = 1; index <= renderBoxsLength; index++) {
    availableBoxes.push({
      x: x + index,
      y: y - index,
    });
  }
  return availableBoxes;
};

const getAvailableKnightSquares = (
  position: IPosition,
  boardLimits: IBoardLimis
) => {
  const movesFunctions = [
    {
      refPiece: getLeftBottomLineSquares,
      childPieces: [getBottomLineSquares, getLeftLineSquares],
    },
    {
      refPiece: getRightBottomLineSquares,
      childPieces: [getBottomLineSquares, getRightLineSquares],
    },
    {
      refPiece: getLeftTopLineSquares,
      childPieces: [getTopLineSquares, getLeftLineSquares],
    },
    {
      refPiece: getRightTopLineSquares,
      childPieces: [getTopLineSquares, getRightLineSquares],
    },
  ];
  return movesFunctions.flatMap((refPiece) => {
    const cornerSquare = refPiece.refPiece(position, boardLimits, 1);
    return refPiece.childPieces.flatMap((f) => {
      if (!cornerSquare.length) {
        return [];
      }
      return f(cornerSquare[0], boardLimits, 1);
    });
  });
};

const getAvailableBishopSquares = (
  position: IPosition,
  boardLimis: IBoardLimis
) => {
  const movesFunctions = [
    getLeftBottomLineSquares,
    getLeftTopLineSquares,
    getRightTopLineSquares,
    getRightBottomLineSquares,
  ];
  return movesFunctions.flatMap((f) => f(position, boardLimis));
};

const getAvailableRookSquares = (
  position: IPosition,
  boardLimis: IBoardLimis
) => {
  const movesFunctions = [
    getBottomLineSquares,
    getTopLineSquares,
    getRightLineSquares,
    getLeftLineSquares,
  ];
  return movesFunctions.flatMap((f) => f(position, boardLimis));
};

const getAvailableQueenSquares = (
  position: IPosition,
  boardLimis: IBoardLimis
) => {
  const movesFunctions = [
    getLeftTopLineSquares,
    getLeftBottomLineSquares,
    getRightBottomLineSquares,
    getRightTopLineSquares,
    getBottomLineSquares,
    getRightLineSquares,
    getLeftLineSquares,
  ];
  return movesFunctions.flatMap((f) => f(position, boardLimis));
};

const getAvailableKingSquares = (
  position: IPosition,
  boardLimis: IBoardLimis
) => {
  const movesFunctions = [
    getLeftTopLineSquares,
    getLeftBottomLineSquares,
    getRightBottomLineSquares,
    getRightTopLineSquares,
    getBottomLineSquares,
    getTopLineSquares,
    getRightLineSquares,
    getLeftLineSquares,
  ];
  return movesFunctions.flatMap((f) => f(position, boardLimis, 1));
};

const buildSquaresMovesMap = {
  bishop: getAvailableBishopSquares,
  knight: getAvailableKnightSquares,
  rook: getAvailableRookSquares,
  queen: getAvailableQueenSquares,
  king: getAvailableKingSquares,
};



export default buildSquaresMovesMap
