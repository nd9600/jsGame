import { BoardPosition, Place } from "@/core/@typings/BoardTypes";
import { Direction } from "@/core/@typings/EventDataTypes";
import Board from "@/core/board/Board";
import FailedMovementEvent from "@/core/events/Movement/FailedMovementEvent";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import SuccessfulMovementEvent from "@/core/events/Movement/SuccessfulMovementEvent";
import GameState from "@/core/GameState";
import usefulFunctions from "@/core/usefulFunctions";
import * as R from "ramda";
import PlayerBoard from "../player/PlayerBoard";

/**
 * Returns the position that could be moved in to (if any), given a list of possible positions
 * @param positionsCouldMoveInto BoardPosition[] - a list of the possible squares that could be moved in to
 * @param board Board
 * @param playerBoard PlayerBoard
 */
function getPositionToMoveIntoFromPossibleList(positionsCouldMoveInto: BoardPosition[], board: Board, playerBoard: PlayerBoard): MovementEvent {
    if (R.isEmpty(positionsCouldMoveInto)) {
        return new FailedMovementEvent(usefulFunctions.makeError("MovementError", "no positions to move in to"));
    }

    const firstWallInWayOfMovementIndex = R.findIndex((possibleWallPosition) => R.equals(
        board.getPosition(possibleWallPosition),
        Place.Wall),
    positionsCouldMoveInto);
    
    let newCharacterPosition: BoardPosition;
    if (firstWallInWayOfMovementIndex === 0) {
        return new FailedMovementEvent(usefulFunctions.makeError("MovementError", "wall immediately beside"));

    // no wall was found, so we can move to the top of the board
    } else if (firstWallInWayOfMovementIndex === -1) {
        newCharacterPosition = positionsCouldMoveInto[positionsCouldMoveInto.length - 1];
    } else {
        newCharacterPosition = positionsCouldMoveInto[firstWallInWayOfMovementIndex - 1];
    }

    return new SuccessfulMovementEvent({boardID: board.id, playerID: playerBoard.playerID, newCharacterPosition});
}

/**
 * Finds last square to move to, makes a list of squares from fromPosition to that square, and finds the last empty square in that list
 * @param board Board
 * @param playerBoard PlayerBoard
 * @param direction Direction
 * @param fromPosition BoardPosition
 */
function getPositionToMoveInto(gameState: GameState, playerBoard: PlayerBoard, direction: Direction): MovementEvent[] {
    const boards = R.values(gameState.boards);
    return R.map((board) => getPositionToMoveIntoForBoard(board, playerBoard, direction),
        boards
    );
}

/**
 * Finds last square to move to, makes a list of squares from fromPosition to that square, and finds the last empty square in that list
 * @param board Board
 * @param direction Direction
 * @param playerBoard PlayerBoard
 * @param fromPosition BoardPosition
 */
function getPositionToMoveIntoForBoard(board: Board, playerBoard: PlayerBoard, direction: Direction): MovementEvent {
    const fromPosition = playerBoard.characterPosition;
    switch (direction) {
        case Direction.Up: {
            if (fromPosition.y === 0) {
                return new FailedMovementEvent(usefulFunctions.makeError("MovementError", "at top of board"));
            }

            // range that decrements doesn't include the starting number i.e. the position, which is what we want
            const yRange = usefulFunctions.range(fromPosition.y, 0);
            const squaresCouldMoveInto = R.map(
                (y): BoardPosition => R.assoc("y", y, fromPosition),
                yRange
            );

            return getPositionToMoveIntoFromPossibleList(squaresCouldMoveInto, board, playerBoard);
        } case Direction.Down: {
            if (fromPosition.y + 1 === board.numberOfRows) {
                return new FailedMovementEvent(usefulFunctions.makeError("MovementError", "at bottom of board"));
            }

            // range that increments does include the starting number i.e. the position, which isn't what we want, so we have to increment by 1 to get rid of it
            const yRange = usefulFunctions.range(fromPosition.y + 1, board.numberOfRows);
            const positionsCouldMoveInto = R.map(
                (y): BoardPosition => R.assoc("y", y, fromPosition),
                yRange
            );

            return getPositionToMoveIntoFromPossibleList(positionsCouldMoveInto, board, playerBoard);
        } case Direction.Left: {
            if (fromPosition.x === 0) {
                return new FailedMovementEvent(usefulFunctions.makeError("MovementError", "at left of board"));
            }
            const xRange = usefulFunctions.range(fromPosition.x, 0);
            const positionsCouldMoveInto = R.map(
                (x): BoardPosition => R.assoc("x", x, fromPosition),
                xRange
            );

            return getPositionToMoveIntoFromPossibleList(positionsCouldMoveInto, board, playerBoard);
        }
        case Direction.Right: {
            if (fromPosition.x + 1 === board.numberOfColumns) {
                return new FailedMovementEvent(usefulFunctions.makeError("MovementError", "at right of board"));
            }
            const xRange = usefulFunctions.range(fromPosition.x + 1, board.numberOfColumns);
            const positionsCouldMoveInto = R.map(
                (x): BoardPosition => R.assoc("x", x, fromPosition),
                xRange
            );

            return getPositionToMoveIntoFromPossibleList(positionsCouldMoveInto, board, playerBoard);
        }
    }
    return usefulFunctions.assertUnreachable(direction);
}

export default {getPositionToMoveInto, getPositionToMoveIntoForBoard};
