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

export { Command, Direction, SuccessfulMovementEventData, InitialGameSetupData, InputEventData, DirectionEventData, PlayerNameChangeEventData, StatusChangeEventData, StartPointChangeEventData, EndPointChangeEventData, ToggleWallEventData };

