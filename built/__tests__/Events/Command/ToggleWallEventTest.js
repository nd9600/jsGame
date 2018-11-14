import { Place, Status } from "@/core/@typings/BoardTypes";
import Board from "@/core/board/Board";
import ToggleWallEvent from "@/core/events/Command/ToggleWallEvent";
import GameState from "@/core/GameState";
import usefulFunctions from "@/core/usefulFunctions";
import TestSetup from "@/shell/TestSetup";
import * as R from "ramda";
describe("ToggleWallEvent", () => {
    let size;
    let startPoint;
    let endPoint;
    let initialPlayerName;
    beforeEach(() => {
        const setup = new TestSetup();
        [initialPlayerName, size, startPoint, endPoint] = [
            setup.getInitialPlayerName(),
            setup.getSize(),
            setup.getStartPoint(),
            setup.getEndPoint()
        ];
    });
    it("handles_toggling_wall", () => {
        const boardData = [
            [Place.Wall],
            [Place.Wall],
            [Place.Empty],
            [Place.Empty],
            [Place.Empty]
        ];
        const board = new Board(Board.idCounter++, initialPlayerName, boardData, startPoint, endPoint).setStatus(Status.PlacingWalls);
        const eventData = {
            boardID: board.id,
            positionToToggle: { x: 0, y: 1 }
        };
        const gameState = (new GameState(usefulFunctions.makeBoardsObject([board])));
        const toggleWallEvent = new ToggleWallEvent(eventData);
        const newGameState = toggleWallEvent.handle(gameState);
        const newBoard = R.values(newGameState.boards)[0];
        const wantedBoardData = [
            [Place.Wall],
            [Place.Empty],
            [Place.Empty],
            [Place.Empty],
            [Place.Empty]
        ];
        expect(newBoard.boardData).toEqual(wantedBoardData);
    });
});
//# sourceMappingURL=ToggleWallEventTest.js.map