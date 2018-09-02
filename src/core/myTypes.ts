enum Place {
    Character = "c",
    Wall = "x",
    Empty = " ",
    End = "end"
}

type BoardType = Place[][];
type twoNumbers = [number, number];

enum Direction {Up, Down, Left, Right}
enum Command {MoveUp, MoveDown, MoveLeft, MoveRight}

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

interface InitialGameSetupData {
    size: twoNumbers;
    startPoint: Position;
    endPoint: Position;
}

interface IError {
    name: string;
    message: string;
}

export {Place, BoardType, twoNumbers, Direction, Command, Position, SuccessfulMovementEventData, DispatchedEvent, EventCallback, InitialGameSetupData, IError};
