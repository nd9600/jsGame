import Board from "@/core/board/Board";
import GameState from "@/core/GameState";
import { Position, Status } from "@/core/myTypes";
import usefulFunctions from "@/core/usefulFunctions";

describe("GameStateCreation", () => {
    const pos: Position = { x: 0, y: 0 };
    it("creates_NotStarted_status", () => {
        const board1 = new Board(Board.idCounter++, "", [[]], pos, pos, Status.NotStarted);
        const board2 = new Board(Board.idCounter++, "", [[]], pos, pos, Status.PlacingWalls);
        const gameState = new GameState(usefulFunctions.makeBoardsObject([board1, board2]));
        expect(gameState.status).toEqual(Status.NotStarted);
    });

    it("creates_PlacingWall_status", () => {
        const board = new Board(Board.idCounter++, "", [[]], pos, pos, Status.PlacingWalls);
        const gameState = new GameState(usefulFunctions.makeBoardsObject([board, board]));
        expect(gameState.status).toEqual(Status.PlacingWalls);
    });

    it("creates_Playing_status", () => {
        const board = new Board(Board.idCounter++, "", [[]], pos, pos, Status.Playing);
        const gameState = new GameState(usefulFunctions.makeBoardsObject([board, board]));
        expect(gameState.status).toEqual(Status.Playing);
    });

    it("creates_Finished_status", () => {
        const board = new Board(Board.idCounter++, "", [[]], pos, pos, Status.Finished);
        const gameState = new GameState(usefulFunctions.makeBoardsObject([board, board]));
        expect(gameState.status).toEqual(Status.Finished);
    });

    it("creates_players_object", () => {
        const player1 = "abc";
        const player2 = "def";
        const players = {
            0: player1, 
            1: player2
        };

        const board1 = new Board(Board.idCounter++, player1, [[]], pos, pos, Status.NotStarted);
        const board2 = new Board(Board.idCounter++, player2, [[]], pos, pos, Status.PlacingWalls);
        const gameState = new GameState(usefulFunctions.makeBoardsObject([board1, board2]));
        console.log(gameState.players);
        expect(gameState.players).toEqual(players);
        console.log(gameState.players);
    });
});
