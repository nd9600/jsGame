import { BoardPosition, BoardType, Status } from "@/core/@typings/BoardTypes";
import { DispatchedEvent } from "@/core/@typings/EventTypes";
import GameState from "@/core/GameState";

interface SerializablePlayer {
    id: number;
    name: string;
    score: number;
}

interface SerializableBoard {
    id: number;
    creatorID: number;
    boardData: BoardType;
    startPoint: BoardPosition;
    endPoint: BoardPosition;
    status: Status;
}

interface SerializableGameState {
    players: SerializablePlayer[];
    boards: SerializableBoard[];
}

interface GameStoredInFirebase {
    gameID: string;
    initialGameState: SerializableGameState;
    events: DispatchedEvent[] | string; // string if array is empty, since firebase doesn't store empty arrays
}

interface GameFromFirebase {
    gameID: string;
    initialGameState: GameState;
    events: DispatchedEvent[];
}

export { SerializablePlayer, SerializableBoard, SerializableGameState, GameStoredInFirebase, GameFromFirebase };
