import { IError } from "@/core/@typings/GeneralTypes";
import * as R from "ramda";

function range(start: number, end: number): number[] {
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
}

function makeError(name: string, message: string): IError {
    return {name, message};
}

function errorHandler(error: IError): void {
     console.log(error);
}

function assertUnreachable(x: never): never {
    throw new Error("Didn't expect to get here");
}

function abyss(...args: any[]) {
     return; 
}

function countNumberOf<T>(element: T, list: T[]): number {
    return R.filter(R.equals(element), list).length;
}

export default {
    range, makeError, errorHandler, assertUnreachable, abyss, countNumberOf
};
