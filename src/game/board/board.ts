import * as R from "ramda";
import { Board, Character, Empty, End, Place, Position, twoNumbers, Wall } from "@/game/myTypes";
import movementFunctions from "./movement";

const isPositionOnBoard = (position: Position, board: Board): void => {
    const yIsOnBoard = (0 <= position.y) && (position.y <= board.length);
    const xIsOnBoard = (0 <= position.x) && (position.x <= R.nth(0, board)!.length);
    if (!(yIsOnBoard && xIsOnBoard)) {
        throw new Error(`position ${position} is off the board`);
    }
};

function uncurriedGetPosition(position: Position, board: Board): Place {
    isPositionOnBoard(position, board);

    const row = R.nth(position.y, board)!;
    return R.nth(position.x, row)!;
}
const getPosition = R.curry(uncurriedGetPosition);

function uncurriedSetPosition(position: Position, newValue: Place, board: Board): Board {
    isPositionOnBoard(position, board);

    const row = R.nth(position.y, board)!;
    const newRow = R.update(position.x, newValue, row);
    const newBoard = R.update(position.y, newRow, board);
    return newBoard;
}
const setPosition = R.curry(uncurriedSetPosition);

function makeInitialBoard(size: twoNumbers): Board {
    const empty: Place = " ";
    const row = R.map(R.always(empty), [...Array(size[0])]);
    const board: Board = R.map(R.always(row), [...Array(size[1])]);
    return board;
}

function setInitialPositions(startPoint: Position, endPoint: Position, board: Board): Board {
    return R.compose(
        setPosition(endPoint, "end"),
        setPosition(startPoint, "c"),
    )(board);
}

function boardAsString(board: Board, separator: string = "\n"): string {
    const rowsJoined = R.map(R.join(" ", ), board);
    return R.join(separator, rowsJoined);
}

const exportedFunctions = {
    isPositionOnBoard,
    getPosition,
    setPosition,
    makeInitialBoard,
    setInitialPositions,
    boardAsString
};
export default R.merge(exportedFunctions, movementFunctions);
