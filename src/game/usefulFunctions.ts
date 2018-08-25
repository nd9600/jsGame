import * as R from "ramda";
import {IError} from "@/game/myTypes";

const range = (start: number, end: number): number[] => {
    const rangeStart = Math.min(start, end);
    const rangeEnd = Math.max(start, end);
    const normalRange = Array.from({
            length: (rangeEnd - rangeStart)
        },
        (v, k) => k + rangeStart
    );
    return end < start
        // ? normalRange.map(R.add(0)).reverse()
        ? normalRange.map(R.add(1)).reverse() // range(0,4) = [0,1,2,3] reversed is [3,2,1,0], but we want range(4,0) = [4,3,2,1]
        : normalRange;
};

const makeError = (name: string, message: string): IError => ({name, message});
const errorHandler = (error: IError): void => console.log(error);

const assertUnreachable = (x: never): never => {
    throw new Error("Didn't expect to get here");
};

const abyss = (...args: any[]) => { return; };

export default {
    range, makeError, errorHandler, assertUnreachable, abyss
};
