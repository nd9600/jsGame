import EndPointChangeEvent from "@/core/events/Command/EndPointChangeEvent";
import GameStateFactory from "@/core/factories/GameStateFactory";
import * as R from "ramda";

describe("EndPointChangeEvent", () => {

    it("handles_changing_start_point", () => {
        const gameState = GameStateFactory.createGameState();
        const board = R.values(gameState.boards)[0];

        const boardID = board.id;
        const newEndPoint = {x: 1, y: 1};
        const startPointChangeEvent = new EndPointChangeEvent({boardID, newEndPoint});

        const newGameState = startPointChangeEvent.handle(gameState);
        const newBoard = R.values(newGameState.boards)[0];

        expect(newBoard.endPoint).toEqual(newEndPoint);
    });
});
