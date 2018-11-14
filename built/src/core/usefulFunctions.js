import { Status } from "@/core/@typings/BoardTypes";
import Board from "@/core/board/Board";
import GameState from "@/core/GameState";
import Player from "@/core/player/Player";
import * as R from "ramda";
const range = (start, end) => {
    const rangeStart = Math.min(start, end);
    const rangeEnd = Math.max(start, end);
    const normalRange = Array.from({
        length: (rangeEnd - rangeStart)
    }, (v, k) => k + rangeStart);
    return end < start
        ? normalRange.reverse()
        : normalRange;
};
const makeError = (name, message) => ({ name, message });
const errorHandler = (error) => console.log(error);
const assertUnreachable = (x) => {
    throw new Error("Didn't expect to get here");
};
const abyss = (...args) => { return; };
const makePlayersObject = (players) => R.indexBy((player) => player.id, players);
const makeBoardsObject = (boards) => R.indexBy((board) => board.id, boards);
const makePlayerBoardsObject = (players, boards) => {
    const playerBoards = {};
    for (const playerIDString of Object.keys(players)) {
        const playerID = Number(playerIDString);
        const playerBoardsForThisPlayer = {};
        for (const boardIDString of Object.keys(boards)) {
            const boardID = Number(boardIDString);
            const board = R.prop(boardID, boards);
            const thisPlayerBoard = {
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
const makeNewGameState = () => {
    const defaultPosition = { x: 0, y: 0 };
    const initialPlayer = new Player(-1, "", 0);
    const initialBoard = new Board(-1, -1, [[]], defaultPosition, defaultPosition);
    const playersObject = makePlayersObject([initialPlayer]);
    const boardsObject = makeBoardsObject([initialBoard]);
    const playerBoardsObject = makePlayerBoardsObject(playersObject, boardsObject);
    return new GameState(playersObject, boardsObject, playerBoardsObject);
};
const countNumberOf = (element, list) => R.filter(R.equals(element), list).length;
export default {
    range, makeError, errorHandler, assertUnreachable, abyss, makePlayersObject, makeBoardsObject, makePlayerBoardsObject, makeNewGameState, countNumberOf
};
//# sourceMappingURL=usefulFunctions.js.map