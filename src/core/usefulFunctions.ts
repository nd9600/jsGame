import Board from "@/core/board/Board";
import GameState from "@/core/GameState";
import { IError, Boards } from "@/core/myTypes";
import * as R from "ramda";

const range = (start: number, end: number): number[] => {
    const rangeStart = Math.min(start, end);
    const rangeEnd = Math.max(start, end);
    const normalRange = Array.from({
            length: (rangeEnd - rangeStart)
        },
        (v, k) => k + rangeStart
    );
    return end < start
        ? normalRange.reverse()
        : normalRange;
};

const makeError = (name: string, message: string): IError => ({name, message});
const errorHandler = (error: IError): void => console.log(error);

const assertUnreachable = (x: never): never => {
    throw new Error("Didn't expect to get here");
};

const abyss = (...args: any[]) => { return; };

const makeBoards = (boards: Board[]): Boards => {
    const boardsObject = {};
    R.forEach((board: Board) => {
        R.assoc(board.id, board, boardsObject);
    }, boards);
    return boardsObject;
};

const makeNewGameState = (): GameState => {
    const defaultPosition = { x: 0, y: 0 };
    const initialBoard = new Board(-1, [[]], defaultPosition, defaultPosition);
    const boardsObject = makeBoards([initialBoard]);
    return new GameState(boardsObject);
};

export default {
    range, makeError, errorHandler, assertUnreachable, abyss, makeNewGameState, makeBoards
};
