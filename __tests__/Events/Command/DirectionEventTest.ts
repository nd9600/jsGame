import { BoardPosition, BoardType, Place, Status } from "@/core/@typings/BoardTypes";
import { Direction } from "@/core/@typings/EventDataTypes";
import Board from "@/core/board/Board";
import DirectionEvent from "@/core/events/Command/DirectionEvent";
import GameStateFactory from "@/core/factories/GameStateFactory";
import Player from "@/core/player/Player";
import * as R from "ramda";

describe("DirectionEvent", () => {
    const endPoint = {
        x: 9001,
        y: 9001
    };

    it("handles direction event", () => {
        const board1Data: BoardType = [ [Place.Empty], [Place.Character], [Place.Empty], [Place.Empty], [Place.Empty] ];
        const characterPosition1: BoardPosition = {x: 0, y: 1};

        const board2Data: BoardType = [ [Place.Empty], [Place.Empty], [Place.Empty], [Place.Character], [Place.Empty] ];
        const characterPosition2: BoardPosition = {x: 0, y: 3};

        const player1 = new Player(Player.idCounter++, "", 0);

        const board1 = new Board(Board.idCounter++, -1, board1Data, characterPosition1, endPoint, Status.Playing);
        const board2 = new Board(Board.idCounter++, -1, board2Data, characterPosition2, endPoint, Status.Playing);
        let gameState = GameStateFactory.createGameState({players: [player1], boards: [board1, board2]});

        const expectedCharacterPosition = {
            x: 0,
            y: 4
        };
        const directionEvent = new DirectionEvent({direction: Direction.Down, player: player1});
        gameState = directionEvent.handle(gameState);
        R.forEach((newBoard: Board) => {
            const playerBoard = gameState.getPlayerBoard(player1.id, newBoard.id);
            expect(playerBoard.characterPosition).toEqual(expectedCharacterPosition);
        }, R.values(gameState.boards));        
    });

    it("doesn't handle direction event when both boards aren't Playing", () => {
        const board1Data: BoardType = [ [Place.Empty], [Place.Character], [Place.Empty], [Place.Empty], [Place.Empty] ];
        const characterPosition1: BoardPosition = {x: 0, y: 1};

        const board2Data: BoardType = [ [Place.Empty], [Place.Empty], [Place.Empty], [Place.Character], [Place.Empty] ];

        const player1 = new Player(Player.idCounter++, "", 0);

        const board1 = new Board(Board.idCounter++, -1, board1Data, characterPosition1, endPoint, Status.PlacingWalls);
        const board2 = new Board(Board.idCounter++, -1, board2Data, characterPosition1, endPoint, Status.Playing);
        let gameState = GameStateFactory.createGameState({players: [player1], boards: [board1, board2]});

        const directionEvent = new DirectionEvent({direction: Direction.Down, player: player1});
        gameState = directionEvent.handle(gameState);
        R.forEach((newBoard: Board) => {
            const playerBoard = gameState.getPlayerBoard(player1.id, newBoard.id);
            expect(playerBoard.characterPosition).toEqual(characterPosition1);
        }, R.values(gameState.boards));        
    });
});

