import * as R from "ramda";
import {Either, left, right} from "fp-ts/lib/Either";
import {Board, Direction, IError, Position, GameState} from "@/game/myTypes";
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

const move = (errorHandler: (error: IError) => void, direction: Direction, {characterPosition, board}: GameState): GameState => {
    
    boardFunctions.isPositionOnBoard(characterPosition, board);

    const squareToMoveIntoResult = getSquareToMoveInto(board, direction, characterPosition);
    return squareToMoveIntoResult.fold(
        (error) => {
            errorHandler(error);
            return {characterPosition, board};
        },
        (squareToMoveInto) => {
            console.log(characterPosition);
            console.log(squareToMoveInto);
            const newCharacterPosition = squareToMoveInto;
            const newBoard = R.compose(
                boardFunctions.setPosition(characterPosition, " "),
                boardFunctions.setPosition(squareToMoveInto, "c")
            )(board);

            return {
                characterPosition: newCharacterPosition, 
                board: newBoard
            };
        }
    );
};

export default {
    move
};
