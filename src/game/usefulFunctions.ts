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
        ? normalRange.reverse()
        : normalRange;
};

const makeError = (name: string, message: string): IError => ({name, message});
const errorHandler = (error: IError): void => console.log(error);

export default {
    range, makeError, errorHandler
};
