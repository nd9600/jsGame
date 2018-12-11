import { PlayerBoardStatus } from "@/core/@typings/PlayerTypes";
import SetPlayerBoardStatusToFinishedEvent from "@/core/events/Command/SetPlayerBoardStatusToFinishedEvent";
import GameStateFactory from "@/core/factories/GameStateFactory";
import * as R from "ramda";
import EventRunner from "@/core/events/EventRunner";

describe("SetPlayerBoardStatusToFinishedEvent", () => {

    it("handles_changing_status", () => {
        const player0 = GameStateFactory.defaultPlayer();
        const player1 = GameStateFactory.defaultPlayer();
        const board0 = GameStateFactory.defaultBoard(player0.id);
        const board1 = GameStateFactory.defaultBoard(player1.id);
        
        const gameState = GameStateFactory.createGameState({players: [player0, player1], boards: [board0, board1]});
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

    it("handles_increasing_score", () => {
        let player0 = GameStateFactory.defaultPlayer();
        let player1 = GameStateFactory.defaultPlayer();
        const board0 = GameStateFactory.defaultBoard(player0.id);
        const board1 = GameStateFactory.defaultBoard(player1.id);
        
        const gameState = GameStateFactory.createGameState({players: [player0, player1], boards: [board0, board1]});

        const newGameState = EventRunner.runEvents([
            new SetPlayerBoardStatusToFinishedEvent({playerID: player0.id, boardID: board0.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player0.id, boardID: board1.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player1.id, boardID: board0.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player1.id, boardID: board1.id}),
        ], gameState);

        player0 = R.values(newGameState.players)[0];
        player1 = R.values(newGameState.players)[1];

        expect(player0.score).toEqual(10);
        expect(player1.score).toEqual(10);
    });
});
