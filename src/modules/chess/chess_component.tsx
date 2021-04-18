import React, { useState } from 'react';
import styles from './chess_styles.module.scss';
import {
  EPlayerType,
  IBoardLimis,
  IMove,
  IPiece,
  IPosition,
} from '@/shared/interfaces';
import {
  initBoard,
  boxIsWhite,
  resetBoardMovesGuide,
  drawMovesGuide,
  changePiecePosition,
  getInitialTurn,
} from '@/services/chess/chess_logic';

const BOARD_LIMITS: IBoardLimis = {
  columns: 8,
  rows: 8,
};

const getBoxClass = (
  columnIndex: number,
  rowIndex: number,
  available: boolean
) => {
  const boxColor = boxIsWhite(columnIndex, rowIndex) ? styles.Chess__boxA : '';
  const boxAvailable = available ? styles.Chess__boxAvailable : '';
  return `${styles.Chess__row} ${boxAvailable} ${boxColor}`;
};

const ChessModule = () => {
  const [board, setBoard] = useState(initBoard(BOARD_LIMITS));
  const [player, setPlayer] = useState<EPlayerType>(getInitialTurn);
  const [move, setMove] = useState<IMove | null>(null);

  const handleBoxClick = (piece: IPiece) => {
    if (!piece) {
      return;
    }
    console.log('piece', piece);
    // console.log('playher', player);
    // if (player !== playerTurn) {
    //   alert('No es tu turno');
    //   return;
    // }
    if (move && move.pieceA) {
      // alredey have selected piece
      console.log({...move, pieceB: piece});
      console.log('move', move);
      const newBoard = changePiecePosition({ ...board }, {...move, pieceB: piece});
      setMove(null);
      setBoard(newBoard);
      return;
    }
    const currentBoard = resetBoardMovesGuide({ ...board });
    const newBoard = drawMovesGuide(
      currentBoard,
      piece.name,
      piece.position,
      BOARD_LIMITS
    );
    setMove({ ...move, pieceA: piece });
    setBoard(newBoard);
  };

  return (
    <div className={styles.Chess}>
      <div>
        <span>Turno</span>
        <span>{player}</span>
      </div>
      {board.rows.map((column, columnIndex) => (
        <div className={styles.Chess__column} key={`c${columnIndex}`}>
          {column.columns.map((row, rowIndex) => {
            const { name, position, available } = row;
            return (
              <div
                onClick={() => handleBoxClick(row)}
                className={getBoxClass(columnIndex, rowIndex, available)}
                key={`r${rowIndex}`}
                data-position={position}
                data-name={name}
              >
                {name && <img src={`/chessFigures/${name}.svg`} alt="" />}
                {`x${row.position.x}, y:${row.position.y}`}
                {/* {piece && <span>{piece.player}</span>} */}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ChessModule;
