import { PlayerBoardStatus } from "@/core/@typings/PlayerTypes";
import SetPlayerBoardStatusToFinishedEvent from "@/core/events/Command/SetPlayerBoardStatusToFinishedEvent";
import EventRunner from "@/core/events/EventRunner";
import GameStateFactory from "@/core/factories/GameStateFactory";
import PlayerBoardBuilder from "@/core/player/PlayerBoardBuilder";
import * as R from "ramda";

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
    
    // player 0 completes board 0, player 1 completes board 0, etc
    
    //p0b0 p1b0 p0b1 p1b1
    
    //p0b0 p1b0 p0b1 ____
    //p0b0 p1b0 ____ p1b1
    //p0b0 ____ p0b1 p1b1
    //____ p1b0 p0b1 p1b1
    
    //p0b0 p1b0 ____ ____
    //p0b0 ____ p0b1 ____
    //____ p1b0 p0b1 ____
    //p0b0 ____ ____ p1b1
    //____ p1b0 ____ p1b1
    //____ ____ p0b1 p1b1
    
    //p0b0 ____ ____ ____
    //____ ____ ____ p1b1
    //____ ____ p0b1 ____
    //____ p1b0 ____ ____
    
    //____ ____ ____ ____
    
    it("player 0 gets 10 points when solving player0 board only", () => {
        let player0 = GameStateFactory.defaultPlayer();
        let player1 = GameStateFactory.defaultPlayer();
        const board0 = GameStateFactory.defaultBoard(player0.id);
        const board1 = GameStateFactory.defaultBoard(player1.id);
        
        let gameState = GameStateFactory.createGameState({players: [player0, player1], boards: [board0, board1]});
        
        gameState = gameState
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player0.id, board0.id), {
                    characterPosition: board0.endPoint
                })
            )
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player0.id, board1.id), {
                    characterPosition: board1.startPoint
                })
            )
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player1.id, board0.id), {
                    characterPosition: board0.startPoint
                })
            )
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player1.id, board1.id), {
                    characterPosition: board1.startPoint
                })
            );

        gameState = EventRunner.runEvents([
            new SetPlayerBoardStatusToFinishedEvent({playerID: player0.id, boardID: board0.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player0.id, boardID: board1.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player1.id, boardID: board0.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player1.id, boardID: board1.id}),
        ], gameState);

        player0 = R.values(gameState.players)[0];
        player1 = R.values(gameState.players)[1];
        
        /*
         When all PlayerBoards are Finished, if
            - you complete your maze & opponent doesn't, you get 10 points
            - both complete a maze, both get 5 points
            - neither complete maze, 0 points
            - you don't complete your maze & opponent does, they get 20 points
        */

        expect(player0.score).toEqual(10);
        expect(player1.score).toEqual(0);
    });

    it("both players get 5 points when solving player0 board only", () => {
        let player0 = GameStateFactory.defaultPlayer();
        let player1 = GameStateFactory.defaultPlayer();
        const board0 = GameStateFactory.defaultBoard(player0.id);
        const board1 = GameStateFactory.defaultBoard(player1.id);
        
        let gameState = GameStateFactory.createGameState({players: [player0, player1], boards: [board0, board1]});
        
        gameState = gameState
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player0.id, board0.id), {
                    characterPosition: board0.endPoint
                })
            )
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player0.id, board1.id), {
                    characterPosition: board1.startPoint
                })
            )
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player1.id, board0.id), {
                    characterPosition: board0.endPoint
                })
            )
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player1.id, board1.id), {
                    characterPosition: board1.startPoint
                })
            );

        gameState = EventRunner.runEvents([
            new SetPlayerBoardStatusToFinishedEvent({playerID: player0.id, boardID: board0.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player0.id, boardID: board1.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player1.id, boardID: board0.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player1.id, boardID: board1.id}),
        ], gameState);

        player0 = R.values(gameState.players)[0];
        player1 = R.values(gameState.players)[1];
        
        /*
         When all PlayerBoards are Finished, if
            - you complete your maze & opponent doesn't, you get 10 points
            - both complete a maze, both get 5 points
            - neither complete maze, 0 points
            - you don't complete your maze & opponent does, they get 20 points
        */

        expect(player0.score).toEqual(5);
        expect(player1.score).toEqual(5);
    });
    
    it("both players get 0 points when solving no maze", () => {
        let player0 = GameStateFactory.defaultPlayer();
        let player1 = GameStateFactory.defaultPlayer();
        const board0 = GameStateFactory.defaultBoard(player0.id);
        const board1 = GameStateFactory.defaultBoard(player1.id);
        
        let gameState = GameStateFactory.createGameState({players: [player0, player1], boards: [board0, board1]});
        
        gameState = gameState
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player0.id, board0.id), {
                    characterPosition: board0.startPoint
                })
            )
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player0.id, board1.id), {
                    characterPosition: board1.startPoint
                })
            )
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player1.id, board0.id), {
                    characterPosition: board0.startPoint
                })
            )
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player1.id, board1.id), {
                    characterPosition: board1.startPoint
                })
            );

        gameState = EventRunner.runEvents([
            new SetPlayerBoardStatusToFinishedEvent({playerID: player0.id, boardID: board0.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player0.id, boardID: board1.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player1.id, boardID: board0.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player1.id, boardID: board1.id}),
        ], gameState);

        player0 = R.values(gameState.players)[0];
        player1 = R.values(gameState.players)[1];
        
        /*
         When all PlayerBoards are Finished, if
            - you complete your maze & opponent doesn't, you get 10 points
            - both complete a maze, both get 5 points
            - neither complete maze, 0 points
            - you don't complete your maze & opponent does, they get 20 points
        */

        expect(player0.score).toEqual(0);
        expect(player1.score).toEqual(0);
    });
    
    it("player 0 get 20 points when solving player 1's maze only", () => {
        let player0 = GameStateFactory.defaultPlayer();
        let player1 = GameStateFactory.defaultPlayer();
        const board0 = GameStateFactory.defaultBoard(player0.id);
        const board1 = GameStateFactory.defaultBoard(player1.id);
        
        let gameState = GameStateFactory.createGameState({players: [player0, player1], boards: [board0, board1]});
        
        gameState = gameState
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player0.id, board0.id), {
                    characterPosition: board0.startPoint
                })
            )
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player0.id, board1.id), {
                    characterPosition: board1.endPoint
                })
            )
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player1.id, board0.id), {
                    characterPosition: board0.startPoint
                })
            )
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player1.id, board1.id), {
                    characterPosition: board1.startPoint
                })
            );

        gameState = EventRunner.runEvents([
            new SetPlayerBoardStatusToFinishedEvent({playerID: player0.id, boardID: board0.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player0.id, boardID: board1.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player1.id, boardID: board0.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player1.id, boardID: board1.id}),
        ], gameState);

        player0 = R.values(gameState.players)[0];
        player1 = R.values(gameState.players)[1];
        
        /*
         When all PlayerBoards are Finished, if
            - you complete your maze & opponent doesn't, you get 10 points
            - both complete a maze, both get 5 points
            - neither complete maze, 0 points
            - you don't complete your maze & opponent does, they get 20 points
        */

        expect(player0.score).toEqual(20);
        expect(player1.score).toEqual(0);
    });
});
