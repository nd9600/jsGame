import { PlayerBoardStatus } from "@/core/@typings/PlayerTypes";
import SetPlayerBoardStatusToFinishedEvent from "@/core/events/Command/SetPlayerBoardStatusToFinishedEvent";
import EventRunner from "@/core/events/EventRunner";
import GameStateFactory from "@/core/factories/GameStateFactory";
import PlayerBoardBuilder from "@/core/player/PlayerBoardBuilder";
import * as R from "ramda";

describe("SetPlayerBoardStatusToFinishedEvent", () => {
    
    function assertScores(
        p0b0Solved: boolean, 
        p0b1Solved: boolean, 
        p1b0Solved: boolean, 
        p1b1Solved: boolean, 
        player0Score: number, 
        player1Score: number
    ): void {
        let player0 = GameStateFactory.defaultPlayer();
        let player1 = GameStateFactory.defaultPlayer();
        const board0 = GameStateFactory.defaultBoard(player0.id);
        const board1 = GameStateFactory.defaultBoard(player1.id);
        
        let gameState = GameStateFactory.createGameState({players: [player0, player1], boards: [board0, board1]});
        
        gameState = gameState
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player0.id, board0.id), {
                    characterPosition: p0b0Solved ? board0.endPoint : board0.startPoint
                })
            )
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player0.id, board1.id), {
                    characterPosition: p0b1Solved ? board1.endPoint : board1.startPoint
                })
            )
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player1.id, board0.id), {
                    characterPosition: p1b0Solved ? board0.endPoint : board0.startPoint
                })
            )
            .replacePlayerBoard(
                PlayerBoardBuilder.mergeWithOptions(gameState.getPlayerBoard(player1.id, board1.id), {
                    characterPosition: p1b1Solved ? board1.endPoint : board1.startPoint
                })
            );

        gameState = EventRunner.runEvents([
            new SetPlayerBoardStatusToFinishedEvent({playerID: player0.id, boardID: board0.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player0.id, boardID: board1.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player1.id, boardID: board0.id}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player1.id, boardID: board1.id}),
        ], gameState);
        
        //throw new Error(gameState.getCurrentInfo());

        player0 = R.values(gameState.players)[0];
        player1 = R.values(gameState.players)[1];
        
        /*
         When all PlayerBoards are Finished, if
            - you complete your maze & opponent doesn't, you get 10 points
            - both complete a maze, both get 5 points
            - neither complete maze, 0 points
            - you don't complete your maze & opponent does, they get 20 points
        */

        expect(player0.score).toEqual(player0Score);
        expect(player1.score).toEqual(player1Score);
    }

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
    
    // player 0 completes board 0, player 0 completes board 1, etc  
      
    //____ ____ ____ ____ 0 0
    
    //p0b0 ____ ____ ____ 10 0
    //____ p0b1 ____ ____ 20 0
    //____ ____ p1b0 ____ 0 20
    //____ ____ ____ p1b1 0 10
    
    //p0b0 p0b1 ____ ____ 30 0
    //p0b0 ____ p1b0 ____ 5 5
    //p0b0 ____ ____ p1b1 10 10
    //____ p0b1 p1b0 ____ 20 20
    //____ p0b1 ____ p1b1 5 5
    //____ ____ p1b0 p1b1 0 30
    
    //p0b0 p0b1 p1b0 ____ 25 5
    //____ p0b1 p1b0 p1b1 5 25
    //p0b0 ____ p1b0 p1b1 5 15
    //p0b0 p0b1 ____ p1b1 15 5 
    
    //p0b0 p0b1 p1b0 p1b1 10 10
    
    it("both players get 0 points when solving no maze", () => {
        assertScores(false, false, false, false, 0, 0);
    });
    
    it("p0b0 ____ ____ ____: 10 0", () => {            
        assertScores(true, false, false, false, 10, 0);
    });
    it("____ p0b1 ____ ____: 20 0", () => {            
        assertScores(false, true, false, false, 20, 0);
    });
    it("____ ____ p1b0 ____: 0 20", () => {            
        assertScores(false, false, true, false, 0, 20);
    });
    it("____ ____ ____ p1b1: 0 10", () => {            
        assertScores(false, false, false, true, 0, 10);
    });
    
    it("p0b0 p0b1 ____ ____: 30 0", () => {            
        assertScores(true, true, false, false, 30, 0);
    });
    it("p0b0 ____ p1b0 ____: 5 5", () => {            
        assertScores(true, false, true, false, 5, 5);
    });
    it("p0b0 ____ ____ p1b1: 10 10", () => {            
        assertScores(true, false, false, true, 10, 10);
    });
    // ################################
    it("p0b0 ____ ____ ____: 10 0", () => {            
        assertScores(true, false, false, false, 10, 0);
    });
    it("p0b0 ____ ____ ____: 10 0", () => {            
        assertScores(true, false, false, false, 10, 0);
    });
    it("p0b0 ____ ____ ____: 10 0", () => {            
        assertScores(true, false, false, false, 10, 0);
    });
    
    it("p0b0 p1b0 p0b1 p1b1: 10 10", () => {            
        assertScores(true, true, true, true, 10, 10);
    });
});
