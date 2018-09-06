import { BoardType, Place, Position, twoNumbers } from "@/core/myTypes";
import * as R from "ramda";
function makeInitialBoard(size: twoNumbers, startPoint: Position, endPoint: Position): BoardType {
    const initialRow = R.map(R.always(Place.Empty), [...Array(size[0])]);
    const initialBoard: BoardType = R.map(R.always(initialRow), [...Array(size[1])]);

    // set character position
    let row = R.nth(startPoint.y, initialBoard)!;
    let newRow = R.update(startPoint.x, Place.Character, row);
    let newBoard = R.update(startPoint.y, newRow, initialBoard);

    // set end position
    row = R.nth(endPoint.y, newBoard)!;
    newRow = R.update(endPoint.x, Place.End, row);
    newBoard = R.update(endPoint.y, newRow, newBoard);

    return newBoard;
}

export default {makeInitialBoard};
