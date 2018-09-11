import { Boards } from "@/core/@typings/GameStateTypes";
import { IError } from "@/core/@typings/GeneralTypes";
import Board from "@/core/board/Board";
import GameState from "@/core/GameState";
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

const makeBoardsObject = (boards: Board[]): Boards => R.indexBy((board: Board) => board.id, boards);

const makeNewGameState = (): GameState => {
    const defaultPosition = { x: 0, y: 0 };
    const initialBoard = new Board(-1, "", [[]], defaultPosition, defaultPosition);
    const boardsObject = makeBoardsObject([initialBoard]);
    return new GameState(boardsObject);
};

const countNumberOf = <T>(element: T, list: T[]): number => R.filter(R.equals(element), list).length;

export default {
    range, makeError, errorHandler, assertUnreachable, abyss, makeBoardsObject, makeNewGameState, countNumberOf
};
