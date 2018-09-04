import Board from "@/core/board/Board";
import FailedMovementEvent from "@/core/events/Movement/FailedMovementEvent";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import SuccessfulMovementEvent from "@/core/events/Movement/SuccessfulMovementEvent";
import GameState from "@/core/GameState";
import { Direction, Place, Position } from "@/core/myTypes";
import usefulFunctions from "@/core/usefulFunctions";
import * as R from "ramda";

/**
 * Returns the position that could be moved in to (if any), given a list of possible positions
 * @param positionsCouldMoveInto Position[] - a list of the possible squares that could be moved in to
 * @param board Board
 */
function getPositionToMoveIntoFromPossibleList(positionsCouldMoveInto: Position[], board: Board): MovementEvent {
    const firstWallInWayOfMovementIndex = R.findIndex((possibleWallPosition) => R.equals(
        board.getPosition(possibleWallPosition),
        Place.Wall),
    positionsCouldMoveInto);
    
    let positionToMoveInto: Position;
    if (firstWallInWayOfMovementIndex === 0) {
        return new FailedMovementEvent(usefulFunctions.makeError("MovementError", "wall immediately beside"));

    // no wall was found, so we can move to the top of the board
    } else if (firstWallInWayOfMovementIndex === -1) {
        positionToMoveInto = positionsCouldMoveInto[positionsCouldMoveInto.length - 1];
    } else {
        positionToMoveInto = positionsCouldMoveInto[firstWallInWayOfMovementIndex - 1];
    }

    return new SuccessfulMovementEvent(board.id, positionToMoveInto);
}

/**
 * Finds last square to move to, makes a list of squares from fromPosition to that square, and finds the last empty square in that list
 * @param board Board
 * @param direction Direction
 * @param fromPosition Position
 */
function getPositionToMoveInto(gameState: GameState, direction: Direction): MovementEvent[] {
    const boards = R.values(gameState.boards);
    return R.map((board) => getPositionToMoveIntoForBoard(board, direction),
        boards
    );
}

/**
 * Finds last square to move to, makes a list of squares from fromPosition to that square, and finds the last empty square in that list
 * @param board Board
 * @param direction Direction
 * @param fromPosition Position
 */
function getPositionToMoveIntoForBoard(board: Board, direction: Direction): MovementEvent {
    const fromPosition = board.characterPosition;
    switch (direction) {
        case Direction.Up: {
            if (fromPosition.y === 0) {
                return new FailedMovementEvent(usefulFunctions.makeError("MovementError", "at top of board"));
            }

            // range that decrements doesn't include the starting number i.e. the position, which is what we want
            const yRange = usefulFunctions.range(fromPosition.y, 0);
            const squaresCouldMoveInto = R.map(
                (y): Position => R.assoc("y", y, fromPosition),
                yRange
            );

            return getPositionToMoveIntoFromPossibleList(squaresCouldMoveInto, board);
        } case Direction.Down: {
            if (fromPosition.y + 1 === board.numberOfRows) {
                return new FailedMovementEvent(usefulFunctions.makeError("MovementError", "at bottom of board"));
            }

            // range that increments does include the starting number i.e. the position, which isn't what we want, so we have to increment by 1 to get rid of it
            const yRange = usefulFunctions.range(fromPosition.y + 1, board.numberOfRows);
            const positionsCouldMoveInto = R.map(
                (y): Position => R.assoc("y", y, fromPosition),
                yRange
            );

            return getPositionToMoveIntoFromPossibleList(positionsCouldMoveInto, board);
        } case Direction.Left: {
            if (fromPosition.x === 0) {
                return new FailedMovementEvent(usefulFunctions.makeError("MovementError", "at left of board"));
            }
            const xRange = usefulFunctions.range(fromPosition.x, 0);
            const positionsCouldMoveInto = R.map(
                (x): Position => R.assoc("x", x, fromPosition),
                xRange
            );

            return getPositionToMoveIntoFromPossibleList(positionsCouldMoveInto, board);
        }
        case Direction.Right: {
            if (fromPosition.x + 1 === board.numberOfColumns) {
                return new FailedMovementEvent(usefulFunctions.makeError("MovementError", "at right of board"));
            }
            const xRange = usefulFunctions.range(fromPosition.x + 1, board.numberOfColumns);
            const positionsCouldMoveInto = R.map(
                (x): Position => R.assoc("x", x, fromPosition),
                xRange
            );

            return getPositionToMoveIntoFromPossibleList(positionsCouldMoveInto, board);
        }
    }
    return usefulFunctions.assertUnreachable(direction);
}

export default {getPositionToMoveInto, getPositionToMoveIntoForBoard};
