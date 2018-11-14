import PlayerBoard from "./PlayerBoard";
export default class PlayerBoardBuilder {
    static mergeWithOptions(playerBoard, playerBoardOptions) {
        return new PlayerBoard(playerBoard.playerID, playerBoard.boardID, playerBoardOptions.characterPosition || playerBoard.characterPosition, playerBoardOptions.boardStatus || playerBoard.boardStatus);
    }
}
//# sourceMappingURL=PlayerBoardBuilder.js.map