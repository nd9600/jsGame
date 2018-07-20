import * as R from "ramda";
import { Wall, Character, Empty, End, Place, Board, twoNumbers, Direction, Position } from "@/game/myTypes";
import boardFunctions from "./board";

const move = (fromPosition: Position, direction: Direction, board: Board): Board => {
    boardFunctions.isPositionOnBoard(fromPosition, board);

    switch (direction) {
        case Direction.Up:
            const squareIsEmpty = (position: Position, board: Board): bool => boardFunctions.getPosition(position, board) === " ";
            break;
        case Direction.Down:
            break;
        case Direction.Left:
            break;
        case Direction.Right:
            break;
    }

    return R.compose(
        boardFunctions.setPosition(fromPosition, " ")
    )(board);
};

export default {
    move
};
