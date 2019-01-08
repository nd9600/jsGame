import { Status } from "@/core/@typings/BoardTypes";
import EndPointChangeEvent from "@/core/events/Command/EndPointChangeEvent";
import GameStateFactory from "@/core/factories/GameStateFactory";
import * as R from "ramda";

describe("EndPointChangeEvent", () => {

    it("handles_changing_end_point", () => {
        const gameState = GameStateFactory.createGameState();
        const board = R.values(gameState.boards)[0];

        const boardID = board.id;
        const newEndPoint = {x: 1, y: 1};
        const endPointChangeEvent = new EndPointChangeEvent({boardID, newEndPoint});

        const newGameState = endPointChangeEvent.handle(gameState);
        const newBoard = R.values(newGameState.boards)[0];

        expect(newBoard.endPoint).toEqual(newEndPoint);
    });

    it("wont change end point if wrong status", () => {
        let gameState = GameStateFactory.createGameState();
        let board = R.values(gameState.boards)[0];
        board = board.setStatus(Status.PlacingWalls);
        gameState = gameState.replaceBoard(board);

        const boardID = board.id;
        const newEndPoint = {x: 1, y: 1};
        const endPointChangeEvent = new EndPointChangeEvent({boardID, newEndPoint});

        const newGameState = endPointChangeEvent.handle(gameState);
        const newBoard = R.values(newGameState.boards)[0];

        expect(newBoard.endPoint).toEqual(board.endPoint);
    });
});
