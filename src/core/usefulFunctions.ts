import Board from "@/core/board/Board";
import GameState from "@/core/GameState";
import { IError } from "@/core/myTypes";

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

const makeNewGameState = (): GameState => {
    const defaultPosition = { x: 0, y: 0 };
    return new GameState(new Board(
        -1,
        [[]],
        defaultPosition,
        defaultPosition
    ));
};

export default {
    range, makeError, errorHandler, assertUnreachable, abyss, makeNewGameState
};
