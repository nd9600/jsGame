import * as R from "ramda";
import {Either, left, right} from "fp-ts/lib/Either";
import {Board, Direction, IError, Position, GameState, Place} from "@/game/myTypes";
import boardFunctions from "./board";
import usefulFunctions from "@/game/usefulFunctions";

/**
 * Finds last square to move to, makes a list of squares from fromPosition to that square, and finds the last empty square in that list
 * @param board Board
 * @param direction Direction
 * @param fromPosition Position
 */
function getSquareToMoveInto(board: Board, direction: Direction, fromPosition: Position): Either<IError, Position> {
    switch (direction) {
        case Direction.Up:
            if (fromPosition.y === 0) {
                return left(usefulFunctions.makeError("MovementError", "at top of board"));
            }
            const yRange = usefulFunctions.range(fromPosition.y, 0);
            const squaresCouldMoveInto = R.map(
                (y): Position => R.assoc("y", y, fromPosition),
                yRange
            );

            const wallInWayOfMovementIndex = R.findIndex((position) => {
                const thingAtPosition = boardFunctions.getPosition(position, board);
                return thingAtPosition === Place.Wall;
            }, squaresCouldMoveInto);
            
            let squareToMoveInto: Position;
            if (wallInWayOfMovementIndex === 0) {
                return left(usefulFunctions.makeError("MovementError", "wall immediately above"));

            // no wall was found, so we can move to the top of the board
            } else if (wallInWayOfMovementIndex === -1) {
                squareToMoveInto = squaresCouldMoveInto[squaresCouldMoveInto.length - 1];
            } else {
                squareToMoveInto = squaresCouldMoveInto[wallInWayOfMovementIndex - 1];
            }

            return right(squareToMoveInto);
        case Direction.Down:
            break;
        case Direction.Left:
            break;
        case Direction.Right:
            break;
    }
    // return usefulFunctions.assertUnreachable(direction);
    return left(usefulFunctions.makeError("ImpossibleError", "should never be returned"));
}

const move = (errorHandler: (error: IError) => void, direction: Direction, gameState: GameState): GameState => {

    const {characterPosition, board} = gameState;
    
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
                boardFunctions.setPosition(characterPosition, Place.Empty),
                boardFunctions.setPosition(squareToMoveInto, Place.Character)
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
