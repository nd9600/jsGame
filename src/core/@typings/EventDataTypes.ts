import { twoNumbers, BoardPosition, Status } from "@/core/@typings/BoardTypes";

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

interface ToggleWallEventData {
    boardID: number;
    positionToToggle: BoardPosition;
}

export { Command, Direction, SuccessfulMovementEventData, InitialGameSetupData, PlayerNameChangeEventData, StatusChangeEventData, ToggleWallEventData };
