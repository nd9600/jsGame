import { BoardPosition, Status, twoNumbers } from "@/core/@typings/BoardTypes";
import Player from "@/core/player/Player";

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

interface InitialGameSetupData {
    initialPlayerName: string;
    size: twoNumbers;
    startPoint: BoardPosition;
    endPoint: BoardPosition;
    playerIDs: [number, number];
    boardIDs: [number, number];
}

interface InputEventData {
    command: Command;
    player: Player;
}

interface DirectionEventData {
    direction: Direction;
    player: Player;
}

interface SuccessfulMovementEventData {
    playerID: number;
    boardID: number;
    newCharacterPosition: BoardPosition;
}

interface PlayerNameChangeEventData {
    playerID: number;
    newPlayerName: string;
}

interface StatusChangeEventData {
    boardID: number;
    newStatus: Status;
}

interface SetPlayerBoardStatusToFinishedEventData {
    playerID: number;
    boardID: number;
}

interface StartPointChangeEventData {
    boardID: number;
    newStartPoint: BoardPosition;
}

interface EndPointChangeEventData {
    boardID: number;
    newEndPoint: BoardPosition;
}

interface ToggleWallEventData {
    boardID: number;
    positionToToggle: BoardPosition;
}

export { Command, Direction, SuccessfulMovementEventData, InitialGameSetupData, InputEventData, DirectionEventData, PlayerNameChangeEventData, StatusChangeEventData, SetPlayerBoardStatusToFinishedEventData, StartPointChangeEventData, EndPointChangeEventData, ToggleWallEventData };

