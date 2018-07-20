import * as R from "ramda";
import { Wall, Character, Empty, End, Place, Board, twoNumbers, Direction, Position } from "@/game/myTypes";
import boardFunctions from "./board";
import usefulFunctions from "@/game/usefulFunctions";

/**
 * Finds last square to move to, makes a list of squares from fromPosition to that square, and finds the last empty square in that list
 * @param board Board
 * @param direction Direction
 * @param fromPosition Position
 */
function getSquareToMoveInto(board: Board, direction: Direction, fromPosition: Position): Position | undefined {
    const squareIsEmpty = (position: Position): boolean => {
        return boardFunctions.getPosition(position, board) === " ";
    };
    switch (direction) {
        case Direction.Up:
            const yRange = usefulFunctions.range(fromPosition.y, 0);
            const rangeOfSquares = R.map(
                (y): Position => R.assoc("y", y, fromPosition), 
                yRange
            );
            const squareToMoveInto = R.findLast(squareIsEmpty, rangeOfSquares);
            console.log(fromPosition);
            console.log(yRange);
            console.log(rangeOfSquares);
            console.log(squareToMoveInto);

            return squareToMoveInto;
        case Direction.Down:
            break;
        case Direction.Left:
            break;
        case Direction.Right:
            break;
    }
    return {
        x: 0, y: 0
    };
}

const move = (fromPosition: Position, direction: Direction, board: Board): Board => {
    boardFunctions.isPositionOnBoard(fromPosition, board);

    // use Maybe monad from Folktale
    const squareToMoveInto = getSquareToMoveInto(board, direction, fromPosition);
    if (squareToMoveInto) {
        return R.compose(
            boardFunctions.setPosition(fromPosition, " "),
            boardFunctions.setPosition(squareToMoveInto, "c")
        )(board);
    }
    return board;
};

export default {
    move
};
