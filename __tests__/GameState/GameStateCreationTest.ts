import { BoardPosition, Status } from "@/core/@typings/BoardTypes";
import Board from "@/core/board/Board";
import GameStateFactory from "@/core/factories/GameStateFactory";
import Player from "@/core/player/Player";

describe("GameStateCreation", () => {
    const pos: BoardPosition = { x: 0, y: 0 };
    it("creates_NotStarted_status", () => {
        const board1 = new Board(Board.idCounter++, -1, [[]], pos, pos, Status.NotStarted);
        const board2 = new Board(Board.idCounter++, -1, [[]], pos, pos, Status.PlacingWalls);
        const gameState = GameStateFactory.createGameState({boards: [board1, board2]});
        expect(gameState.status).toEqual(Status.NotStarted);
    });

    it("creates_PlacingWalls_status", () => {
        const board = new Board(Board.idCounter++, -1, [[]], pos, pos, Status.PlacingWalls);
        const gameState = GameStateFactory.createGameState({boards: [board, board]});
        expect(gameState.status).toEqual(Status.PlacingWalls);
    });

    it("creates PlayingWalls status when one board is PlacingWalls and one is Playing", () => {
        const board1 = new Board(Board.idCounter++, -1, [[]], pos, pos, Status.PlacingWalls);
        const board2 = new Board(Board.idCounter++, -1, [[]], pos, pos, Status.Playing);
        const gameState = GameStateFactory.createGameState({boards: [board1, board2]});
        expect(gameState.status).toEqual(Status.PlacingWalls);
    });

    it("creates_Playing_status", () => {
        const board = new Board(Board.idCounter++, -1, [[]], pos, pos, Status.Playing);
        const gameState = GameStateFactory.createGameState({boards: [board, board]});
        expect(gameState.status).toEqual(Status.Playing);
    });

    it("creates_Finished_status", () => {
        const board = new Board(Board.idCounter++, -1, [[]], pos, pos, Status.Finished);
        const gameState = GameStateFactory.createGameState({boards: [board, board]});
        expect(gameState.status).toEqual(Status.Finished);
    });

    it("creates_players_object", () => {
        const player1 = new Player(-1, "abc", 0);
        const player2 = new Player(-2, "def", 0);
        const players = [player1, player2];
        const playersObject = {
            "-1": {id: -1, name: "abc", score: 0}, 
            "-2": {id: -2, name: "def", score: 0}
        };

        const board1 = new Board(Board.idCounter++, player1.id, [[]], pos, pos, Status.NotStarted);
        const board2 = new Board(Board.idCounter++, player2.id, [[]], pos, pos, Status.PlacingWalls);
        const gameState = GameStateFactory.createGameState({
            players,
            boards: [board1, board2]
        });
        expect(gameState.players).toEqual(playersObject);
    });

    it("gets current info", () => {
        Player.idCounter = 0;
        Board.idCounter = 0;
        const wantedString = `Status: NotStarted

Board #0
Status: NotStarted
Start point: {\"x\":0,\"y\":0}
End point: {\"x\":1,\"y\":1}
Board:
  
0

#####
Player #0, , 0 points

Player #0, Board #0
Character position: {\"x\":0,\"y\":0}
Board Status: Playing

`;
        expect(GameStateFactory.createGameState().getCurrentInfo()).toEqual(wantedString);
    })
});
