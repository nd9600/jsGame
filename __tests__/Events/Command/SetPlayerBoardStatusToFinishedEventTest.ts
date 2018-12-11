import { PlayerBoardStatus } from "@/core/@typings/PlayerTypes";
import SetPlayerBoardStatusToFinishedEvent from "@/core/events/Command/SetPlayerBoardStatusToFinishedEvent";
import GameStateFactory from "@/core/factories/GameStateFactory";
import * as R from "ramda";

describe("SetPlayerBoardStatusToFinishedEvent", () => {

    it("handles_changing_status", () => {
        const gameState = GameStateFactory.createGameState();
        const player = R.values(gameState.players)[0];
        const board = R.values(gameState.boards)[0];

        const playerID = player.id;
        const boardID = board.id;
        const newStatus = PlayerBoardStatus.Finished;
        const statusChangeEvent = new SetPlayerBoardStatusToFinishedEvent({playerID, boardID});

        const newGameState = statusChangeEvent.handle(gameState);
        const newPlayerBoard = newGameState.getPlayerBoard(playerID, boardID);

        expect(newPlayerBoard.boardStatus).toEqual(newStatus);
    });
});
