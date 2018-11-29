import StartPointChangeEvent from "@/core/events/Command/StartPointChangeEvent";
import GameStateFactory from "@/core/factories/GameStateFactory";
import * as R from "ramda";

describe("StartPointChangeEvent", () => {

    it("handles_changing_start_point", () => {
        const gameState = GameStateFactory.createGameState();
        const board = R.values(gameState.boards)[0];

        const boardID = board.id;
        const newStartPoint = {x: 1, y: 1};
        const startPointChangeEvent = new StartPointChangeEvent({boardID, newStartPoint});

        const newGameState = startPointChangeEvent.handle(gameState);
        const newBoard = R.values(newGameState.boards)[0];

        expect(newBoard.startPoint).toEqual(newStartPoint);
    });
});
