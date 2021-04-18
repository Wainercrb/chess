import figuresMap from '@/services/chess/figuresMap.json';
import buildSquaresMovesMap from '@/services/chess/moves';
import {
  EPlayerType,
  IBoard,
  IBoardLimis,
  IMove,
  IPiece,
  IPosition,
} from '@/shared/interfaces';

const initBoard = ({ columns, rows }: IBoardLimis) => {
  const board: IBoard = { rows: [] };
  for (let row = 0; row < rows; row++) {
    board.rows.push({ columns: [] });
    for (let column = 0; column < columns; column++) {
      const position = { x: row, y: column };
      const piece = getFigureByPiecePosition(position, row);
      board.rows[row].columns.push({
        available: false,
        ...piece,
        position,
      });
    }
  }
  return board;
};

const resetBoardMovesGuide = (board: IBoard) => {
  return {
    rows: board.rows.map((row) => ({
      columns: row.columns.map((column) => ({
        ...column,
        available: false,
      })),
    })),
  };
};

const changePiecePosition = (board: IBoard, { pieceA, pieceB }: IMove) => {
  const currentBoard = { ...board };
  currentBoard.rows[pieceA.position.x].columns[pieceA.position.y] = {
    player: '',
    name: '',
    available: false,
    position: pieceA.position, // keep position
  };
  currentBoard.rows[pieceB.position.x].columns[pieceB.position.y] = {
    ...pieceA,
    position: pieceB.position, // keep position
  };
  return currentBoard;
};

const drawMovesGuide = (
  board: IBoard,
  pieceName: string,
  position: IPosition,
  BOARD_LIMITS: IBoardLimis
) => {
  const currentBoard = { ...board };
  const moves = getAvailablesBoxesByFigure(pieceName, position, BOARD_LIMITS);
  for (let index = 0; index < moves.length; index++) {
    const { x, y } = moves[index];
    currentBoard.rows[x].columns[y].available = true;
  }
  return currentBoard;
};

const boxIsWhite = (columnIndex: number, rowIndex: number) => {
  if (columnIndex % 2 === 0) {
    return rowIndex % 2 !== 0;
  }
  return rowIndex % 2 === 0;
};

const getFigureByPiecePosition = ({ x, y }: IPosition, rowIndex: number) => {
  return figuresMap[`${x},${y}`] || (figuresMap[`c-${rowIndex}`] as IPiece);
};

const getAvailablesBoxesByFigure = (
  pieceName: string,
  position: IPosition,
  boardLimis: IBoardLimis
) => {
  const movesFunctions = buildSquaresMovesMap[pieceName];
  if (movesFunctions && typeof movesFunctions === 'function') {
    return movesFunctions(position, boardLimis);
  }
  return [];
};

const getInitialTurn = () => {
  const randomNumber = Math.floor(Math.random() * 2);
  if (randomNumber === 0) {
    return 'A' as EPlayerType;
  }
  return 'B' as EPlayerType;
};

export {
  initBoard,
  boxIsWhite,
  resetBoardMovesGuide,
  drawMovesGuide,
  getFigureByPiecePosition,
  getInitialTurn,
  changePiecePosition,
};
