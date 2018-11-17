import { BoardPosition, Place, Status } from "@/core/@typings/BoardTypes";
import Board from "@/core/board/Board";
import GameStateFactory from "@/core/factories/GameStateFactory";
import * as R from "ramda";

describe("ReplacingBoardInGameState", () => {
    const pos: BoardPosition = { x: 0, y: 0 };
    it("replaces_board", () => {
        const board1 = new Board(Board.idCounter++, -1, [[Place.Character]], pos, pos, Status.NotStarted);
        const board2 = board1.setPosition(pos, Place.Empty);
        const gameState = GameStateFactory.makeNewGameState({boards: [board1]});
        const gameState2 = gameState.replaceBoard(board2);
        expect(R.values(gameState2.boards)[0]).toEqual(board2);
    });
});
