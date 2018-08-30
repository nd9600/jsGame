enum Place {
    Character = "c",
    Wall = "x",
    Empty = " ",
    End = "end"
}

type BoardType = Place[][];
type twoNumbers = [number, number];

enum Direction {Up, Down, Left, Right}

interface Position {
    x: number;
    y: number;
}

interface SuccessfulMovementEventData {
    boardID: number;
    newCharacterPosition: Position;
}

interface DispatchedEvent {
    type: string;
    data?: any;
}

type EventCallback = (dispatchedEvent: DispatchedEvent) => void;

interface IError {
    name: string;
    message: string;
}

export {Place, BoardType, twoNumbers, Direction, Position, SuccessfulMovementEventData, DispatchedEvent, EventCallback, IError};
