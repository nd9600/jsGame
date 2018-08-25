import * as R from "ramda";
import {Either, left, right} from "fp-ts/lib/Either";
import {Board, Direction, IError, Position, GameState, Place} from "@/game/myTypes";
import boardFunctions from "./board";
import usefulFunctions from "@/game/usefulFunctions";

/**
 * Returns the position that could be moved in to (if any), given a list of possible positions
 * @param positionsCouldMoveInto Position[] - a list of the possible squares that could be moved in to
 * @param board Board
 */
function getPositionToMoveIntoFromPossibleList(positionsCouldMoveInto: Position[], board: Board): Either<IError, Position> {
    const wallInWayOfMovementIndex = R.findIndex((possibleWallPosition) => R.equals(
        boardFunctions.getPosition(possibleWallPosition, board),
        Place.Wall),
    positionsCouldMoveInto);
    
    let positionToMoveInto: Position;
    if (wallInWayOfMovementIndex === 0) {
        return left(usefulFunctions.makeError("MovementError", "wall immediately above"));

    // no wall was found, so we can move to the top of the board
    } else if (wallInWayOfMovementIndex === -1) {
        positionToMoveInto = positionsCouldMoveInto[positionsCouldMoveInto.length - 1];
    } else {
        positionToMoveInto = positionsCouldMoveInto[wallInWayOfMovementIndex - 1];
    }

    return right(positionToMoveInto);
}

/**
 * Finds last square to move to, makes a list of squares from fromPosition to that square, and finds the last empty square in that list
 * @param board Board
 * @param direction Direction
 * @param fromPosition Position
 */
function getPositionToMoveInto(board: Board, direction: Direction, fromPosition: Position): Either<IError, Position> {
    switch (direction) {
        case Direction.Up: {
            if (fromPosition.y === 0) {
                return left(usefulFunctions.makeError("MovementError", "at top of board"));
            }
            const yRange = usefulFunctions.range(fromPosition.y, 0);
            const squaresCouldMoveInto = R.map(
                (y): Position => R.assoc("y", y, fromPosition),
                yRange
            );

            return getPositionToMoveIntoFromPossibleList(squaresCouldMoveInto, board);
        } case Direction.Down: {
            if (fromPosition.y === board.length - 1) {
                return left(usefulFunctions.makeError("MovementError", "at bottom of board"));
            }
            const yRange = usefulFunctions.range(fromPosition.y, board.length);
            const positionsCouldMoveInto = R.map(
                (y): Position => R.assoc("y", y, fromPosition),
                yRange
            );

            return getPositionToMoveIntoFromPossibleList(positionsCouldMoveInto, board);
        } case Direction.Left: {
            if (fromPosition.x === 0) {
                return left(usefulFunctions.makeError("MovementError", "at left of board"));
            }
            const xRange = usefulFunctions.range(fromPosition.x, 0);
            const positionsCouldMoveInto = R.map(
                (x): Position => R.assoc("x", x, fromPosition),
                xRange
            );

            return getPositionToMoveIntoFromPossibleList(positionsCouldMoveInto, board);
        }
        case Direction.Right: {
            if (fromPosition.x === board[0].length - 1) {
                return left(usefulFunctions.makeError("MovementError", "at right of board"));
            }
            const xRange = usefulFunctions.range(fromPosition.x, board[0].length);
            const positionsCouldMoveInto = R.map(
                (x): Position => R.assoc("x", x, fromPosition),
                xRange
            );

            return getPositionToMoveIntoFromPossibleList(positionsCouldMoveInto, board);
        }
    }
    return usefulFunctions.assertUnreachable(direction);
}

const move = (errorHandler: (error: IError) => void, direction: Direction, gameState: GameState): GameState => {
    const {characterPosition, board} = gameState;
    boardFunctions.isPositionOnBoard(characterPosition, board);

    const positionToMoveIntoEither = getPositionToMoveInto(board, direction, characterPosition);
    return positionToMoveIntoEither.fold(
        (error) => {
            errorHandler(error);
            return {characterPosition, board};
        },
        (newCharacterPosition) => {
            const newBoard = R.compose(
                boardFunctions.setPosition(characterPosition, Place.Empty),
                boardFunctions.setPosition(newCharacterPosition, Place.Character)
            )(board);

            return {
                characterPosition: newCharacterPosition, 
                board: newBoard
            };
        }
    );
};

export default {
    move, getPositionToMoveInto
};
