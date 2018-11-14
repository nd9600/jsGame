import { BoardPosition, Status } from "./BoardTypes";

/**
 * A list of possible options that can be used to make a new player from an existing one
 */
interface PlayerOptions {
    name?: string;
    score?: number;
}

interface PlayerBoardOptions {
    characterPosition?: BoardPosition;
    boardStatus?: Status;
}

export { PlayerOptions, PlayerBoardOptions };
