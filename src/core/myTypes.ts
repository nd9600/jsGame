import Board from "@/core/board/Board";

////////////////////
///// gameState
////////////////////

interface Players {
    [id: number]: string;
}

interface Boards {
    [id: number]: Board;
}

////////////////////
///// board
////////////////////

/**
 * A list of possible options that can be used to make a new board from an existing one
 */
interface BoardOptions {
    player?: string;
    boardData?: BoardType;
    characterPosition?: Position;
    endPoint?: Position;
    status?: Status;
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
///// interaction
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
    initialPlayerName: string;
    size: twoNumbers;
    startPoint: Position;
    endPoint: Position;
}

interface SuccessfulMovementEventData {
    boardID: number;
    newCharacterPosition: Position;
}

interface PlayerNameChangeEventData {
    boardID: number;
    newPlayerName: string;
}

interface StatusChangeEventData {
    boardID: number;
    newStatus: Status;
}

interface IError {
    name: string;
    message: string;
}

export { Place, BoardType, twoNumbers, Direction, Command, Position, SuccessfulMovementEventData, DispatchedEvent, EventCallback, InitialGameSetupData, PlayerNameChangeEventData, StatusChangeEventData, Boards, Status, BoardOptions, Players, IError };
