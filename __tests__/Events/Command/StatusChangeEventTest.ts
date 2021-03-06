import { Status } from "@/core/@typings/BoardTypes";
import StatusChangeEvent from "@/core/events/Command/StatusChangeEvent";
import GameStateFactory from "@/core/factories/GameStateFactory";
import * as R from "ramda";

describe("StatusChangeEvent", () => {

    it("handles_changing_status", () => {
        const gameState = GameStateFactory.createGameState();
        const board = R.values(gameState.boards)[0];

        const boardID = board.id;
        const newStatus = Status.PlacingWalls;
        const statusChangeEvent = new StatusChangeEvent({boardID, newStatus});

        const newGameState = statusChangeEvent.handle(gameState);
        const newBoard = R.values(newGameState.boards)[0];

        expect(newBoard.status).toEqual(newStatus);
    });
});
