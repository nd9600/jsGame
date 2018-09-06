import Board from "@/core/board/Board";

interface Boards {
    [id: number]: Board;
}

type BoardType = Place[][];
type twoNumbers = [number, number];

enum Place {
    Character = "c",
    Wall = "x",
    Empty = " ",
    End = "end"
}

interface Position {
    x: number;
    y: number;
}

enum Status {
    NotStarted = "NotStarted",
    PlacingWalls = "PlacingWalls",
    Playing = "Playing",
    Finished = "Finished"
}

////////////////////
///// 
////////////////////

enum Command {
    MoveUp = "MoveUp",
    MoveDown = "MoveDown",
    MoveLeft = "MoveLeft",
    MoveRight = "MoveRight"
}
enum Direction {
    Up = "Up",
    Down = "Down",
    Left = "Left",
    Right = "Right"
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

interface SuccessfulMovementEventData {
    boardID: number;
    newCharacterPosition: Position;
}

interface IError {
    name: string;
    message: string;
}

export {Place, BoardType, twoNumbers, Direction, Command, Position, SuccessfulMovementEventData, DispatchedEvent, EventCallback, InitialGameSetupData, Boards, Status, IError};
