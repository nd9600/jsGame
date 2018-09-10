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

interface DispatchedGeneralEvent {
    type: "Event";
    data?: any;
}

interface DispatchedInitialSetupEvent {
    type: "InitialSetupEvent";
    data: InitialGameSetupData;
}

interface DispatchedInputEvent {
    type: "InputEvent";
    data: Command;
}

interface DispatchedFailedMovementEvent {
    type: "FailedMovementEvent";
    data: IError;
}

interface DispatchedMovementEvent {
    type: "MovementEvent";
    data?: any;
}

interface DispatchedSuccessfulMovementEventEvent {
    type: "SuccessfulMovementEvent";
    data: SuccessfulMovementEventData;
}

interface DispatchedCommandEvent {
    type: "CommandEvent";
    data?: any;
}

interface DispatchedDirectionEvent {
    type: "DirectionEvent";
    data: Direction;
}

interface DispatchedPlayerNameChangeEvent {
    type: "PlayerNameChangeEvent";
    data: PlayerNameChangeEventData;
}

interface DispatchedStatusChangeEvent {
    type: "StatusChangeEvent";
    data: StatusChangeEventData;
}

interface DispatchedToggleWallEvent {
    type: "ToggleWallEvent";
    data: ToggleWallEventData;
}

type DispatchedEvent = DispatchedGeneralEvent | DispatchedInitialSetupEvent | DispatchedInputEvent | DispatchedFailedMovementEvent | DispatchedMovementEvent | DispatchedSuccessfulMovementEventEvent | DispatchedCommandEvent | DispatchedDirectionEvent | DispatchedPlayerNameChangeEvent | DispatchedStatusChangeEvent | DispatchedToggleWallEvent;

type DispatchedEventNameTypes = DispatchedEvent["type"];
type DispatchedEventDataTypes = DispatchedEvent["data"];

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

interface ToggleWallEventData {
    boardID: number;
    positionToToggle: Position;
}

interface IError {
    name: string;
    message: string;
}

export { Place, BoardType, twoNumbers, Direction, Command, Position, SuccessfulMovementEventData, DispatchedEvent, DispatchedEventNameTypes, DispatchedEventDataTypes, EventCallback, InitialGameSetupData, PlayerNameChangeEventData, StatusChangeEventData, ToggleWallEventData, Boards, Status, BoardOptions, Players, IError };
