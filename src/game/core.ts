import * as R from "ramda";
import { Board, Character, Empty, End, Place, Position, twoNumbers, Wall } from "./myTypes";

function yInputToPos(boardHeight: number, y: number): number {
    return (boardHeight - 1) - y;
}

function getPosition(position: Position, board: Board): Place {
    const row = board[position.y];
    return row[position.x];
}
const curriedGetPosition = R.curry(getPosition);

function setPosition(position: Position, newValue: Place, board: Board): Board {
    const row = board[position.y];
    const newRow = R.update(position.y, newValue, row);
    const newBoard = R.update(position.x, newRow, board);
    return newBoard;
}
const curriedSetPosition = R.curry(setPosition);

function makeInitialBoard(size: twoNumbers): Board {
    const row = Array(size[0]).fill(" ");
    const board = Array(size[1]).fill(row);
    return board;
}

function setInitialPositions(startPoint: Position, endPoint: Position, board: Board): Board {
    return R.compose(
        curriedSetPosition(endPoint, "end"),
        curriedSetPosition(startPoint, "c"),
    )(board);
}

export default {
    getPosition: curriedGetPosition,
    setPosition: curriedSetPosition,

    makeInitialBoard,
    setInitialPositions
};
