import { PlayerBoardOptions } from "@/core/@typings/PlayerTypes";
import PlayerBoard from "./PlayerBoard";

export default class PlayerBoardBuilder {
    public static mergeWithOptions(playerBoard: PlayerBoard, playerBoardOptions: PlayerBoardOptions): PlayerBoard {
        return new PlayerBoard(
            playerBoard.playerID,
            playerBoard.boardID,
            playerBoardOptions.characterPosition || playerBoard.characterPosition,
            playerBoardOptions.boardStatus || playerBoard.boardStatus
        );
    }
}
