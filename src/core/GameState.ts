import { Status } from "@/core/@typings/BoardTypes";
import { Boards, PlayerBoards, Players } from "@/core/@typings/GameStateTypes";
import Board from "@/core/board/Board";
import Player from "@/core/player/Player";
import PlayerBoard from "@/core/player/PlayerBoard";
import * as R from "ramda";

export default class GameState {

    public readonly status: Status;

    constructor(
        public readonly players: Players, 
        public readonly boards: Boards, 
        public readonly playerBoards: PlayerBoards
        ) {        
        const statuses = R.pluck("status", R.values(boards));

        if (R.contains(Status.NotStarted, statuses)) {
            this.status = Status.NotStarted;
        } else if (R.all(R.equals(Status.PlacingWalls), statuses)) {
            this.status = Status.PlacingWalls;
        } else if (R.all(R.equals(Status.Playing), statuses)) {
            this.status = Status.Playing;
        } else {
            this.status = Status.Finished;
        }
    }

    public getPlayerBoard(playerID: number, boardID: number): PlayerBoard {
        const playerBoardsInternalObject = R.prop(playerID, this.playerBoards);
        return R.prop(boardID, playerBoardsInternalObject);
    }

    public replacePlayer(newPlayer: Player) {
        const newPlayers = R.assoc(newPlayer.id, newPlayer, this.players);
        return new GameState(newPlayers, this.boards, this.playerBoards);
    }

    public replaceBoard(newBoard: Board) {
        const newBoards = R.assoc(newBoard.id, newBoard, this.boards);
        return new GameState(this.players, newBoards, this.playerBoards);
    }

    public replacePlayerBoard(newPlayerBoard: PlayerBoard) {
        const playerID = newPlayerBoard.playerID;
        const boardID = newPlayerBoard.boardID;
        
        const newPlayerBoards = R.assocPath([playerID, boardID], newPlayerBoard, this.playerBoards);
        return new GameState(this.players, this.boards, newPlayerBoards);
    }

    public getCurrentInfo(): string {
        let info = `Status: ${this.status}\n\n`;
        for (const board of R.values(this.boards)) {
            info = `${info}${board.getCurrentInfo()}\n`;
        }

        for (const player of R.values(this.players)) {
            info = `${info}#####\n${player.getCurrentInfo()}\n`;

            const playerBoardsForThisPlayer = R.prop(player.id, this.playerBoards);
            for (const playerBoard of R.values(playerBoardsForThisPlayer)) {
                info = `${info}${playerBoard.getCurrentInfo()}\n`;
            }
        }

        return info;
    }
}
