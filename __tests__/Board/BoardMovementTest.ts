import movementFunctions from "@/core/board/movement";
import { Place, BoardType, Position, Direction } from "@/core/myTypes";
import SuccessfulMovementEvent from "@/core/events/Movement/SuccessfulMovementEvent";
import TestSetup from "@/shell/TestSetup";
import Board from "@/core/board/Board";
import GameState from "@/core/GameState";

describe("BoardMovementUp", () => {
    let _;
    let startPoint: Position;
    let endPoint: Position;
    beforeEach(() => {
        const setup = new TestSetup();
        [_, startPoint, endPoint] = [setup.getSize(), setup.getStartPoint(), setup.getEndPoint()];
    });

    it("applies_succesful_movement_event", () => {
        const boardData: BoardType = [
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

        let gameState = new GameState (
            new Board(Board.idCounter++, boardData, characterPosition, endPoint)
        );

        const expectedCharacterPosition = {
            x: 0,
            y: 0
        };
        const movementEvent = new SuccessfulMovementEvent(gameState.board.id, expectedCharacterPosition);
        gameState = movementEvent.handle(gameState);
        
        expect(gameState.board.characterPosition).toEqual(expectedCharacterPosition);
        expect(gameState.board.getPosition(expectedCharacterPosition)).toEqual(Place.Character);
        expect(gameState.board.getPosition(characterPosition)).toEqual(Place.Empty);
    });

    it("moves_up_from_one_below_top", () => {
        const boardData: BoardType = [
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
        const board = new Board(Board.idCounter++, boardData, characterPosition, endPoint);
        const gameState = new GameState(board);

        const newCharacterPosition = movementFunctions.getPositionToMoveInto(gameState, Direction.Up).data.newCharacterPosition;
        const expectedCharacterPosition = {
            x: 0,
            y: 0
        };
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
    });

    it("moves_up_from_bottom", () => {
        const boardData: BoardType = [
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

        const board = new Board(Board.idCounter++, boardData, characterPosition, endPoint);        
        const gameState = new GameState(board);          
        const newCharacterPosition = movementFunctions.getPositionToMoveInto(gameState, Direction.Up).data.newCharacterPosition;
        const expectedCharacterPosition = {
            x: 0,
            y: 0
        };
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
    });

    it("doesnt_move_up_from_one_below_top_when_blocked", () => {
        const boardData: BoardType = [
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

        const board = new Board(Board.idCounter++, boardData, characterPosition, endPoint);
        const gameState = new GameState(board);

        const errorReturned = movementFunctions.getPositionToMoveInto(gameState, Direction.Up).data;
        const expectedError = {
            message: "wall immediately beside",
            name: "MovementError",
        };
        expect(errorReturned).toEqual(expectedError);
    });

    it("doesnt_move_up_from_one_below_wall_when_blocked", () => {
        const boardData: BoardType = [
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

        const board = new Board(Board.idCounter++, boardData, characterPosition, endPoint);
        const gameState = new GameState(board);

        const errorReturned = movementFunctions.getPositionToMoveInto(gameState, Direction.Up).data;
        const expectedError = {
            message: "wall immediately beside",
            name: "MovementError",
        };
        expect(errorReturned).toEqual(expectedError);
    });

    it("moves_up_to_below_wall", () => {
        const boardData: BoardType = [
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

        const board = new Board(Board.idCounter++, boardData, characterPosition, endPoint);         
        const gameState = new GameState(board);          
        const newCharacterPosition = movementFunctions.getPositionToMoveInto(gameState, Direction.Up).data.newCharacterPosition;
        const expectedCharacterPosition = {
            x: 0,
            y: 2
        };
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
    });
});

describe("BoardMovementDown", () => {
    let _;
    let startPoint: Position;
    let endPoint: Position;
    beforeEach(() => {
        const setup = new TestSetup();
        [_, startPoint, endPoint] = [setup.getSize(), setup.getStartPoint(), setup.getEndPoint()];
    });

    it("moves_down_from_one_above_bottom", () => {
        const boardData: BoardType = [
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

        let gameState = new GameState (
            new Board(Board.idCounter++, boardData, characterPosition, endPoint)
        );

        const expectedCharacterPosition = {
            x: 0,
            y: 4
        };
        const movementEvent = new SuccessfulMovementEvent(gameState.board.id, expectedCharacterPosition);
        gameState = movementEvent.handle(gameState);
        const {board: newBoard} = gameState;
        const newCharacterPosition = newBoard.characterPosition;
        
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
        expect(newBoard.getPosition(expectedCharacterPosition)).toEqual(Place.Character);
        expect(newBoard.getPosition(characterPosition)).toEqual(Place.Empty); 
    });

    it("moves_down_from_top", () => {
        const boardData: BoardType = [
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

        const board = new Board(Board.idCounter++, boardData, characterPosition, endPoint);         
        const gameState = new GameState(board);          
        const newCharacterPosition = movementFunctions.getPositionToMoveInto(gameState, Direction.Down).data.newCharacterPosition;
        const expectedCharacterPosition = {
            x: 0,
            y: 4
        };
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
    });

    it("doesnt_move_down_from_one_above_bottom_when_blocked", () => {
        const boardData: BoardType = [
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

        const board = new Board(Board.idCounter++, boardData, characterPosition, endPoint);
        const gameState = new GameState(board);

        const errorReturned = movementFunctions.getPositionToMoveInto(gameState, Direction.Down).data;
        const expectedError = {
            message: "wall immediately beside",
            name: "MovementError",
        };
        expect(errorReturned).toEqual(expectedError);
    });

    it("doesnt_move_down_from_one_above_wall_when_blocked", () => {
        const boardData: BoardType = [
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

        const board = new Board(Board.idCounter++, boardData, characterPosition, endPoint);
        const gameState = new GameState(board);

        const errorReturned = movementFunctions.getPositionToMoveInto(gameState, Direction.Down).data;
        const expectedError = {
            message: "wall immediately beside",
            name: "MovementError",
        };
        expect(errorReturned).toEqual(expectedError);
    });

    it("moves_below_to_above_wall", () => {
        const boardData: BoardType = [
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

        const board = new Board(Board.idCounter++, boardData, characterPosition, endPoint);         
        const gameState = new GameState(board);          
        const newCharacterPosition = movementFunctions.getPositionToMoveInto(gameState, Direction.Down).data.newCharacterPosition;
        const expectedCharacterPosition = {
            x: 0,
            y: 3
        };
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
    });
});

