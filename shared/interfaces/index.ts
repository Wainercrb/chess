export type EPlayerType = 'A' | 'B'

export interface IPosition {
  x: number;
  y: number;
}

export interface IPiece {
  position: IPosition,
  name?: string;
  player?: string;
  available?: boolean;
}

export interface IBoard {
  rows: {
    columns: IPiece[];
  }[];
}

export interface IBoardLimis {
  columns: number;
  rows: number;
}

export interface IMove {
  pieceA: IPiece,
  pieceB?: IPiece
}
