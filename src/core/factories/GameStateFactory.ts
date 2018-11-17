import { Status } from "@/core/@typings/BoardTypes";
import { Boards, PlayerBoards, Players } from "@/core/@typings/GameStateTypes";
import Board from "@/core/board/Board";
import GameState from "@/core/GameState";
import Player from "@/core/player/Player";
import PlayerBoard from "@/core/player/PlayerBoard";
import * as R from "ramda";

const makePlayersObject = (players: Player[]): Players => R.indexBy((player: Player) => player.id, players);

const makeBoardsObject = (boards: Board[]): Boards => R.indexBy((board: Board) => board.id, boards);

const makePlayerBoardsObject = (players: Players, boards: Boards): PlayerBoards => {
    const playerBoards: PlayerBoards = {};
    for (const playerIDString of Object.keys(players)) {
        const playerID = Number(playerIDString);
        const playerBoardsForThisPlayer: {
            [boardID: number]: PlayerBoard
        } = {};

        for (const boardIDString of Object.keys(boards)) {
            const boardID = Number(boardIDString);
            const board = R.prop(boardID, boards);
            const thisPlayerBoard: PlayerBoard = {
                playerID,
                boardID,
                characterPosition: board.startPoint,
                boardStatus: Status.NotStarted
            };
            playerBoardsForThisPlayer[boardID] = thisPlayerBoard;
        }
        playerBoards[playerID] = playerBoardsForThisPlayer;
    }

    return playerBoards;
};

export default class GameStateFactory {
    private static defaultPosition = { x: 0, y: 0 };
    public static defaultPlayer = new Player(-1, "", 0);
    public static defaultBoard = new Board(-1, -1, [[]], GameStateFactory.defaultPosition, GameStateFactory.defaultPosition);

    public static makeNewGameState = (newGameStateData?: {players?: Player[]; boards?: Board[]; }): GameState => {
        const initialPlayers = newGameStateData && newGameStateData.players || [GameStateFactory.defaultPlayer];
        const initialBoards = newGameStateData && newGameStateData.boards || [GameStateFactory.defaultBoard];

        const playersObject = makePlayersObject(initialPlayers);
        const boardsObject = makeBoardsObject(initialBoards);
        const playerBoardsObject = makePlayerBoardsObject(playersObject, boardsObject);

        return new GameState(playersObject, boardsObject, playerBoardsObject);
    }
}
