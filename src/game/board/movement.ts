import * as R from "ramda";
import {Either, left, right} from "fp-ts/lib/Either";
import {Board, Direction, IError, Position} from "@/game/myTypes";
import boardFunctions from "./board";
import usefulFunctions from "@/game/usefulFunctions";

/**
 * Finds last square to move to, makes a list of squares from fromPosition to that square, and finds the last empty square in that list
 * @param board Board
 * @param direction Direction
 * @param fromPosition Position
 */
function getSquareToMoveInto(board: Board, direction: Direction, fromPosition: Position): Either<IError, Position> {
    const squareIsEmpty = (position: Position): boolean => {
        return boardFunctions.getPosition(position, board) === " ";
    };
    switch (direction) {
        case Direction.Up:
            if (fromPosition.y === 0) {
                return left(usefulFunctions.makeError("MovementError", "at top of board"));
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
                return left(usefulFunctions.makeError("MovementError", "no empty squares"));
            }
            return right(squareToMoveInto);
        case Direction.Down:
            break;
        // Direction.Left
        default:
            break;
    }
    return left(usefulFunctions.makeError("ImpossibleError", "should never be returned"));
}

const move = (errorHandler: (error: IError) => void, fromPosition: Position, direction: Direction, board: Board): Board => {
    boardFunctions.isPositionOnBoard(fromPosition, board);

    // use Maybe monad from Folktale
    const squareToMoveIntoResult = getSquareToMoveInto(board, direction, fromPosition);
    return squareToMoveIntoResult.fold(
        (error) => {
            errorHandler(error);
            return board;
        },
        (squareToMoveInto) => {
            return R.compose(
                boardFunctions.setPosition(fromPosition, " "),
                boardFunctions.setPosition(squareToMoveInto, "c")
            )(board);
        }
    );
};

export default {
    move
};
