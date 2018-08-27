import * as R from "ramda";
import { Place, twoNumbers, BoardType, Position } from "@/core/myTypes";
import movementFunctions from "@/core/board/movement";
function makeInitialBoard(size: twoNumbers, startPoint: Position, endPoint: Position): BoardType {
    const initialRow = R.map(R.always(Place.Empty), [...Array(size[0])]);
    const initialBoard: BoardType = R.map(R.always(initialRow), [...Array(size[1])]);

    let row = R.nth(startPoint.y, initialBoard)!;
    let newRow = R.update(startPoint.x, Place.Character, row);
    let newBoard = R.update(startPoint.y, newRow, initialBoard);

    row = R.nth(endPoint.y, newBoard)!;
    newRow = R.update(endPoint.x, Place.End, row);
    newBoard = R.update(endPoint.y, newRow, newBoard);

    return newBoard;
}

export default R.merge({makeInitialBoard}, movementFunctions);
