import { Place, BoardPosition, Status } from "@/core/@typings/BoardTypes";
import Board from "@/core/board/Board";
import GameState from "@/core/GameState";
import usefulFunctions from "@/core/usefulFunctions";
import * as R from "ramda";


describe("ReplacingBoardInGameState", () => {
    const pos: BoardPosition = { x: 0, y: 0 };
    it("replaces_board", () => {
        const board1 = new Board(Board.idCounter++, "", [[Place.Character]], pos, pos, Status.NotStarted);
        const board2 = board1.setPosition(pos, Place.Empty);
        const gameState = new GameState(usefulFunctions.makeBoardsObject([board1]));
        const gameState2 = gameState.replaceBoard(board2);
        expect(R.values(gameState2.boards)[0]).toEqual(board2);
    });
});
