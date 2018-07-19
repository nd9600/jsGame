import * as R from "ramda";
import { Wall, Character, Empty, End, Place, Board, twoNumbers, Position } from "./myTypes";

function yInputToPos(boardHeight: number, y: number): number {
    return (boardHeight - 1) - y;
}

function getPosition(position: Position, board: Board): Place {
    const actualYPos = yInputToPos(board.length, position.y);
    const row = board[position.y];
    return row[position.x];
}
let curriedGetPosition = R.curry(getPosition);

function setPosition(position: Position, newValue: Place, board: Board): Board {
    position
    const actualYPos = yInputToPos(board.length, position.y);
    console.log(board.length);
    console.log(position.y);
    console.log(actualYPos);
    // console.log(board[actualYPos]);
    let row = board[position.y];
    let newRow = R.update(actualYPos, newValue, row);
    let newBoard = R.update(position.x, newRow, board);
    return newBoard;
}
let curriedSetPosition = R.curry(setPosition);

function makeInitialBoard(size: twoNumbers, startPoint: Position, endPoint: Position): Board {
    let row = Array(size[0]).fill(" ");
    let board = Array(size[1]).fill(row);

    return R.compose(
        curriedSetPosition(endPoint, "end"),
        curriedSetPosition(startPoint, "c")
    )(board);
}

export default {
    makeInitialBoard,
    getPosition: curriedGetPosition,
    setPosition: curriedSetPosition
}