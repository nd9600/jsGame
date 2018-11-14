import { Status } from "@/core/@typings/BoardTypes";
import { Boards, PlayerBoards, Players } from "@/core/@typings/GameStateTypes";
import { IError } from "@/core/@typings/GeneralTypes";
import Board from "@/core/board/Board";
import GameState from "@/core/GameState";
import Player from "@/core/player/Player";
import PlayerBoard from "@/core/player/PlayerBoard";
import * as R from "ramda";

const range = (start: number, end: number): number[] => {
    const rangeStart = Math.min(start, end);
    const rangeEnd = Math.max(start, end);
    const normalRange = Array.from({
            length: (rangeEnd - rangeStart)
        },
        (v, k) => k + rangeStart
    );
    return end < start
        ? normalRange.reverse()
        : normalRange;
};

const makeError = (name: string, message: string): IError => ({name, message});
const errorHandler = (error: IError): void => console.log(error);

const assertUnreachable = (x: never): never => {
    throw new Error("Didn't expect to get here");
};

const abyss = (...args: any[]) => { return; };

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

const makeNewGameState = (newGameStateData?: {players?: Player[]; boards?: Board[]; }): GameState => {
    const defaultPosition = { x: 0, y: 0 };
    const initialPlayers = newGameStateData && newGameStateData.players || [new Player(-1, "", 0)];
    const initialBoards = newGameStateData && newGameStateData.boards || [new Board(-1, -1, [[]], defaultPosition, defaultPosition)];

    const playersObject = makePlayersObject(initialPlayers);
    const boardsObject = makeBoardsObject(initialBoards);
    const playerBoardsObject = makePlayerBoardsObject(playersObject, boardsObject);

    return new GameState(playersObject, boardsObject, playerBoardsObject);
};

const countNumberOf = <T>(element: T, list: T[]): number => R.filter(R.equals(element), list).length;

export default {
    range, makeError, errorHandler, assertUnreachable, abyss, makePlayersObject, makeBoardsObject, makePlayerBoardsObject, makeNewGameState, countNumberOf
};
