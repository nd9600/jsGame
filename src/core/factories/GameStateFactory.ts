import { PlayerBoardStatus } from "@/core//@typings/PlayerTypes";
import { Status } from "@/core/@typings/BoardTypes";
import { Boards, PlayerBoards, Players } from "@/core/@typings/GameStateTypes";
import Board from "@/core/board/Board";
import GameState from "@/core/GameState";
import Player from "@/core/player/Player";
import PlayerBoard from "@/core/player/PlayerBoard";
import * as R from "ramda";

export default class GameStateFactory {
    private static defaultPosition = { x: 0, y: 0 };
    
    public static defaultPlayer() {
        return new Player(Player.idCounter++, "", 0);
    }

    public static defaultBoard(playerID: number) {
        return new Board(Board.idCounter++, playerID, [[]], GameStateFactory.defaultPosition, GameStateFactory.defaultPosition);
    }

    public static createGameState(newGameStateData?: {players?: Player[]; boards?: Board[]; }): GameState {
        const initialPlayers = newGameStateData && newGameStateData.players 
            ? newGameStateData.players 
            : [this.defaultPlayer()];
        const initialBoards = newGameStateData && newGameStateData.boards
            ? newGameStateData.boards
            : [this.defaultBoard(initialPlayers[0].id)];

        const playersObject = GameStateFactory.createPlayersObject(initialPlayers);
        const boardsObject = GameStateFactory.createBoardsObject(initialBoards);
        const playerBoardsObject = GameStateFactory.createPlayerBoardsObject(playersObject, boardsObject);

        return new GameState(playersObject, boardsObject, playerBoardsObject);
    }

    public static createPlayerBoardsObject(players: Players, boards: Boards): PlayerBoards {
        const playerBoards: PlayerBoards = {};

        for (const playerIDString of Object.keys(players)) {
            const playerID = Number(playerIDString);
            const playerBoardsForThisPlayer: {
                [boardID: number]: PlayerBoard
            } = {};
    
            for (const boardIDString of Object.keys(boards)) {
                const boardID = Number(boardIDString);
                const board = R.prop(boardID, boards);
                const thisPlayerBoard = new PlayerBoard(
                    playerID,
                    boardID,
                    board.startPoint,
                    (board.status === Status.Finished) ? PlayerBoardStatus.Solved : PlayerBoardStatus.Playing
                );
                playerBoardsForThisPlayer[boardID] = thisPlayerBoard;
            }
            playerBoards[playerID] = playerBoardsForThisPlayer;
        }
    
        return playerBoards;
    }

    public static createBoardsObject(boards: Board[]): Boards {
        return R.indexBy((board: Board) => board.id, boards);
    }

    public static createPlayersObject(players: Player[]): Players {
        return R.indexBy((player: Player) => player.id, players);
    }
}
