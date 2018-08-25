import * as R from "ramda";
import boardFunctions from "@/game/board/board";
import { Place, Board, Position, Direction, GameState } from "@/game/myTypes";
import usefulFunctions from "@/game/usefulFunctions";

describe("BoardMovementUp", () => {
    // beforeEach(() => {
    // });

    it("moves_up_from_one_below_top", () => {
        const board: Board = [
            [Place.Empty],
            [Place.Character],
            [Place.Empty],
            [Place.Empty],
            [Place.Empty]
        ];
        const characterPosition: Position = {
            x: 0,
            y: 1
        };

        let gameState: GameState = {
            characterPosition,
            board
        };

        gameState = boardFunctions.move(usefulFunctions.errorHandler, Direction.Up, gameState);
        const {characterPosition: newCharacterPosition, board: newBoard} = gameState;
        const expectedCharacterPosition = {
            x: 0,
            y: 0
        };
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
        expect(boardFunctions.getPosition(expectedCharacterPosition, newBoard)).toEqual(Place.Character);
        expect(boardFunctions.getPosition(characterPosition, newBoard)).toEqual(Place.Empty); 
    });

    it("moves_up_from_bottom", () => {
        const board: Board = [
            [Place.Empty],
            [Place.Empty],
            [Place.Empty],
            [Place.Empty],
            [Place.Character]
        ];
        const characterPosition: Position = {
            x: 0,
            y: 4
        };

        let gameState: GameState = {
            characterPosition,
            board
        };

        gameState = boardFunctions.move(usefulFunctions.errorHandler, Direction.Up, gameState);
        const {characterPosition: newCharacterPosition, board: newBoard} = gameState;
        const expectedCharacterPosition = {
            x: 0,
            y: 0
        };
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
    });

    it("doesnt_move_up_from_one_below_top_when_blocked", () => {
        const board: Board = [
            [Place.Wall],
            [Place.Character],
            [Place.Empty],
            [Place.Empty],
            [Place.Empty]
        ];
        const characterPosition: Position = {
            x: 0,
            y: 1
        };

        let gameState: GameState = {
            characterPosition,
            board
        };

        gameState = boardFunctions.move(usefulFunctions.errorHandler, Direction.Up, gameState);
        const {characterPosition: newCharacterPosition, board: newBoard} = gameState;
        const expectedCharacterPosition = characterPosition;

        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
    });

    it("moves_up_to_below_wall", () => {
        const board: Board = [
            [Place.Empty],
            [Place.Wall],
            [Place.Empty],
            [Place.Empty],
            [Place.Character],
            [Place.Empty]
        ];
        const characterPosition: Position = {
            x: 0,
            y: 4
        };

        let gameState: GameState = {
            characterPosition,
            board
        };

        gameState = boardFunctions.move(usefulFunctions.errorHandler, Direction.Up, gameState);
        const {characterPosition: newCharacterPosition, board: newBoard} = gameState;
        const expectedCharacterPosition = {
            x: 0,
            y: 2
        };

        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
    });
});
