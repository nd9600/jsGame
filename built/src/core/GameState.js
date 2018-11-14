import { Status } from "@/core/@typings/BoardTypes";
import * as R from "ramda";
export default class GameState {
    constructor(players, boards, playerBoards) {
        this.players = players;
        this.boards = boards;
        this.playerBoards = playerBoards;
        const statuses = R.pluck("status", R.values(boards));
        if (R.contains(Status.NotStarted, statuses)) {
            this.status = Status.NotStarted;
        }
        else if (R.all(R.equals(Status.PlacingWalls), statuses)) {
            this.status = Status.PlacingWalls;
        }
        else if (R.all(R.equals(Status.Playing), statuses)) {
            this.status = Status.Playing;
        }
        else {
            this.status = Status.Finished;
        }
    }
    getPlayerBoard(playerID, boardID) {
        const playerBoardsInternalObject = R.prop(playerID, this.playerBoards);
        return R.prop(boardID, playerBoardsInternalObject);
    }
    replacePlayer(newPlayer) {
        const newPlayers = R.assoc(newPlayer.id, newPlayer, this.players);
        return new GameState(newPlayers, this.boards, this.playerBoards);
    }
    replaceBoard(newBoard) {
        const newBoards = R.assoc(newBoard.id, newBoard, this.boards);
        return new GameState(this.players, newBoards, this.playerBoards);
    }
    replacePlayerBoard(newPlayerBoard) {
        const playerID = newPlayerBoard.playerID;
        const boardID = newPlayerBoard.boardID;
        const newPlayerBoards = R.assocPath([playerID, boardID], newPlayerBoard, this.playerBoards);
        return new GameState(this.players, this.boards, newPlayerBoards);
    }
}
//# sourceMappingURL=GameState.js.map