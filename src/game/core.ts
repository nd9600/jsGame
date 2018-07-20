import * as R from "ramda";
import { Board, Character, Empty, End, Place, Position, twoNumbers, Wall } from "@/game/myTypes";

function yInputToPos(boardHeight: number, y: number): number {
    return (boardHeight - 1) - y;
}

function uncurriedGetPosition(position: Position, board: Board): Place {
    const row = board[position.y];
    return row[position.x];
}
const getPosition = R.curry(uncurriedGetPosition);

function uncurriedSetPosition(position: Position, newValue: Place, board: Board): Board {
    const row = R.nth(position.y, board)!;
    const newRow = R.update(position.y, newValue, row);
    const newBoard = R.update(position.x, newRow, board);
    console.log(newBoard);
    return newBoard;
}
const setPosition = R.curry(uncurriedSetPosition);

function makeInitialBoard(size: twoNumbers): Board {
    const row = R.map(R.always(" "), [... Array(size[0])] );
    const board = R.map(R.always(row), [... Array(size[1])] );
    return board;
}

function setInitialPositions(startPoint: Position, endPoint: Position, board: Board): Board {
    return R.compose(
        setPosition(endPoint, "end"),
        setPosition(startPoint, "c"),
    )(board);
}

function boardAsString(board: Board, separator: string = "\n"): string {
    const rowsJoined: Place[] = R.map(R.join(" ", ), board);
    return R.join(separator, rowsJoined);
}

export default {
    getPosition,
    setPosition,

    makeInitialBoard,
    setInitialPositions,
    boardAsString
};
