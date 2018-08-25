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

        const newCharacterPosition = boardFunctions.getPositionToMoveInto(board, Direction.Up, characterPosition).value;
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

        const errorReturned = boardFunctions.getPositionToMoveInto(board, Direction.Up, characterPosition).value;
        const expectedError = {
            message: "wall immediately beside",
            name: "MovementError",
        };
        expect(errorReturned).toEqual(expectedError);
    });

    it("doesnt_move_up_from_one_below_wall_when_blocked", () => {
        const board: Board = [
            [Place.Empty],
            [Place.Wall],
            [Place.Character],
            [Place.Empty],
            [Place.Empty]
        ];
        const characterPosition: Position = {
            x: 0,
            y: 2
        };

        const errorReturned = boardFunctions.getPositionToMoveInto(board, Direction.Up, characterPosition).value;
        const expectedError = {
            message: "wall immediately beside",
            name: "MovementError",
        };
        expect(errorReturned).toEqual(expectedError);
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

        const newCharacterPosition = boardFunctions.getPositionToMoveInto(board, Direction.Up, characterPosition).value;
        const expectedCharacterPosition = {
            x: 0,
            y: 2
        };
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
    });
});

describe("BoardMovementDown", () => {

    it("moves_down_from_one_above_bottom", () => {
        const board: Board = [
            [Place.Empty],
            [Place.Empty],
            [Place.Empty],
            [Place.Character],
            [Place.Empty]
        ];
        const characterPosition: Position = {
            x: 0,
            y: 3
        };

        let gameState: GameState = {
            characterPosition,
            board
        };

        gameState = boardFunctions.move(usefulFunctions.errorHandler, Direction.Down, gameState);
        const {characterPosition: newCharacterPosition, board: newBoard} = gameState;
        const expectedCharacterPosition = {
            x: 0,
            y: 4
        };
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
        expect(boardFunctions.getPosition(expectedCharacterPosition, newBoard)).toEqual(Place.Character);
        expect(boardFunctions.getPosition(characterPosition, newBoard)).toEqual(Place.Empty); 
    });

    it("moves_down_from_top", () => {
        const board: Board = [
            [Place.Character],
            [Place.Empty],
            [Place.Empty],
            [Place.Empty],
            [Place.Empty]
        ];
        const characterPosition: Position = {
            x: 0,
            y: 0
        };

        const newCharacterPosition = boardFunctions.getPositionToMoveInto(board, Direction.Down, characterPosition).value;
        const expectedCharacterPosition = {
            x: 0,
            y: 4
        };
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
    });

    it("doesnt_move_down_from_one_above_bottom_when_blocked", () => {
        const board: Board = [
            [Place.Empty],
            [Place.Empty],
            [Place.Empty],
            [Place.Character],
            [Place.Wall]
        ];
        const characterPosition: Position = {
            x: 0,
            y: 3
        };

        const errorReturned = boardFunctions.getPositionToMoveInto(board, Direction.Down, characterPosition).value;
        const expectedError = {
            message: "wall immediately beside",
            name: "MovementError",
        };
        expect(errorReturned).toEqual(expectedError);
    });

    it("doesnt_move_down_from_one_above_wall_when_blocked", () => {
        const board: Board = [
            [Place.Empty],
            [Place.Empty],
            [Place.Character],
            [Place.Wall],
            [Place.Empty]
        ];
        const characterPosition: Position = {
            x: 0,
            y: 2
        };

        const errorReturned = boardFunctions.getPositionToMoveInto(board, Direction.Down, characterPosition).value;
        const expectedError = {
            message: "wall immediately beside",
            name: "MovementError",
        };
        expect(errorReturned).toEqual(expectedError);
    });

    it("moves_below_to_above_wall", () => {
        const board: Board = [
            [Place.Empty],
            [Place.Character],
            [Place.Empty],
            [Place.Empty],
            [Place.Wall],
            [Place.Empty]
        ];
        const characterPosition: Position = {
            x: 0,
            y: 1
        };

        const newCharacterPosition = boardFunctions.getPositionToMoveInto(board, Direction.Down, characterPosition).value;
        const expectedCharacterPosition = {
            x: 0,
            y: 3
        };
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
    });
});

