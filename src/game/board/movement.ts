import * as R from "ramda";
import Result from "folktale/result";
import { Wall, Character, Empty, End, Place, Board, twoNumbers, Direction, Position } from "@/game/myTypes";
import boardFunctions from "./board";
import usefulFunctions from "@/game/usefulFunctions";

/**
 * Finds last square to move to, makes a list of squares from fromPosition to that square, and finds the last empty square in that list
 * @param board Board
 * @param direction Direction
 * @param fromPosition Position
 */
function getSquareToMoveInto(board: Board, direction: Direction, fromPosition: Position): Result {
    const squareIsEmpty = (position: Position): boolean => {
        return boardFunctions.getPosition(position, board) === " ";
    };
    switch (direction) {
        case Direction.Up:
            if (fromPosition.y === 0) {
                return Result.Error("at top of board");
            }
            const yRange = usefulFunctions.range(fromPosition.y, 0);
            const squaresToTopOfBoard = R.map(
                (y): Position => R.assoc("y", y, fromPosition), 
                yRange
            );
            const squareToMoveInto = R.findLast(squareIsEmpty, squaresToTopOfBoard);

            console.log(fromPosition);
            console.log(yRange);
            console.log(squaresToTopOfBoard);
            console.log(squareToMoveInto);

            if (squareToMoveInto == null) {
                return Result.Error("no empty squares");
            }
            return Result.Ok(squareToMoveInto);
        case Direction.Down:
            break;
        case Direction.Left:
            break;
        default:
            return Result.Error("a");
    }
}

const move = (errorHandler: (error: string) => void, fromPosition: Position, direction: Direction, board: Board): Board => {
    boardFunctions.isPositionOnBoard(fromPosition, board);

    // use Maybe monad from Folktale
    const squareToMoveIntoResult = getSquareToMoveInto(board, direction, fromPosition);
    return squareToMoveIntoResult.matchWith({
        Ok: ({squareToMoveInto}: {squareToMoveInto: Position}) => 
            R.compose(
                boardFunctions.setPosition(fromPosition, " "),
                boardFunctions.setPosition(squareToMoveInto, "c")
            )(board),
        Error: ({error}: {error: string}) => {
            errorHandler(error);
            return board;
        }
    });
};

export default {
    move
};
