import Board from "@/core/board/Board";
import movementFunctions from "@/core/board/movement";
import SuccessfulMovementEvent from "@/core/events/Movement/SuccessfulMovementEvent";
import GameState from "@/core/GameState";
import { BoardType, Direction, Place, Position } from "@/core/myTypes";
import usefulFunctions from "@/core/usefulFunctions";
import * as R from "ramda";

describe("BoardMovementUp", () => {
    const endPoint = {
        x: 9001,
        y: 9001
    };

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
            usefulFunctions.makeBoardsObject([new Board(Board.idCounter++, "", boardData, characterPosition, endPoint)])
        );

        const expectedCharacterPosition = {
            x: 0,
            y: 0
        };
        const board = R.values(gameState.boards)[0];
        const movementEvent = new SuccessfulMovementEvent({boardID: board.id, newCharacterPosition: expectedCharacterPosition});
        gameState = movementEvent.handle(gameState);
        
        const newBoard = R.values(gameState.boards)[0];
        expect(newBoard.characterPosition).toEqual(expectedCharacterPosition);
        expect(newBoard.getPosition(expectedCharacterPosition)).toEqual(Place.Character);
        expect(newBoard.getPosition(characterPosition)).toEqual(Place.Empty);
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
        const board = new Board(Board.idCounter++, "", boardData, characterPosition, endPoint);

        const newCharacterPosition = movementFunctions.getPositionToMoveIntoForBoard(board, Direction.Up).data.newCharacterPosition;
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

        const board = new Board(Board.idCounter++, "", boardData, characterPosition, endPoint);        
        const newCharacterPosition = movementFunctions.getPositionToMoveIntoForBoard(board, Direction.Up).data.newCharacterPosition;
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

        const board = new Board(Board.idCounter++, "", boardData, characterPosition, endPoint);

        const errorReturned = movementFunctions.getPositionToMoveIntoForBoard(board, Direction.Up).data;
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

        const board = new Board(Board.idCounter++, "", boardData, characterPosition, endPoint);

        const errorReturned = movementFunctions.getPositionToMoveIntoForBoard(board, Direction.Up).data;
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

        const board = new Board(Board.idCounter++, "", boardData, characterPosition, endPoint);         
        const newCharacterPosition = movementFunctions.getPositionToMoveIntoForBoard(board, Direction.Up).data.newCharacterPosition;
        const expectedCharacterPosition = {
            x: 0,
            y: 2
        };
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
    });
});

describe("BoardMovementDown", () => {
    const endPoint = {
        x: 9001,
        y: 9001
    };

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
            usefulFunctions.makeBoardsObject([new Board(Board.idCounter++, "", boardData, characterPosition, endPoint)])
        );

        const expectedCharacterPosition = {
            x: 0,
            y: 4
        };
        const board = R.values(gameState.boards)[0];
        
        const movementEvent = new SuccessfulMovementEvent({boardID: board.id, newCharacterPosition: expectedCharacterPosition});
        gameState = movementEvent.handle(gameState);
        const newBoard = R.values(gameState.boards)[0];
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

        const board = new Board(Board.idCounter++, "", boardData, characterPosition, endPoint);         
        const newCharacterPosition = movementFunctions.getPositionToMoveIntoForBoard(board, Direction.Down).data.newCharacterPosition;
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

        const board = new Board(Board.idCounter++, "", boardData, characterPosition, endPoint);

        const errorReturned = movementFunctions.getPositionToMoveIntoForBoard(board, Direction.Down).data;
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

        const board = new Board(Board.idCounter++, "", boardData, characterPosition, endPoint);

        const errorReturned = movementFunctions.getPositionToMoveIntoForBoard(board, Direction.Down).data;
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

        const board = new Board(Board.idCounter++, "", boardData, characterPosition, endPoint);         
        const newCharacterPosition = movementFunctions.getPositionToMoveIntoForBoard(board, Direction.Down).data.newCharacterPosition;
        const expectedCharacterPosition = {
            x: 0,
            y: 3
        };
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
    });
});

describe("BoardMovementLeft", () => {
    const endPoint = {
        x: 9001,
        y: 9001
    };

    it("moves_left_from_right", () => {
        const boardData: BoardType = [
            [
                Place.Empty,
                Place.Empty,
                Place.Empty,
                Place.Empty,
                Place.Character
            ]
        ];
        const characterPosition: Position = {
            x: 4,
            y: 0
        };

        const board = new Board(Board.idCounter++, "", boardData, characterPosition, endPoint);         
        const newCharacterPosition = movementFunctions.getPositionToMoveIntoForBoard(board, Direction.Left).data.newCharacterPosition;
        const expectedCharacterPosition = {
            x: 0,
            y: 0
        };
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
    });

    it("moves_left_to_beside_wall", () => {
        const boardData: BoardType = [
            [
                Place.Empty,
                Place.Wall,
                Place.Empty,
                Place.Character,
                Place.Empty
            ]
        ];
        const characterPosition: Position = {
            x: 3,
            y: 0
        };

        const board = new Board(Board.idCounter++, "", boardData, characterPosition, endPoint);         
        const newCharacterPosition = movementFunctions.getPositionToMoveIntoForBoard(board, Direction.Left).data.newCharacterPosition;
        const expectedCharacterPosition = {
            x: 2,
            y: 0
        };
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
    });
});

describe("BoardMovementRight", () => {
    const endPoint = {
        x: 9001,
        y: 9001
    };

    it("moves_right_from_left", () => {
        const boardData: BoardType = [
            [
                Place.Character,
                Place.Empty,
                Place.Empty,
                Place.Empty,
                Place.Empty
            ]
        ];
        const characterPosition: Position = {
            x: 0,
            y: 0
        };

        const board = new Board(Board.idCounter++, "", boardData, characterPosition, endPoint);         
        const newCharacterPosition = movementFunctions.getPositionToMoveIntoForBoard(board, Direction.Right).data.newCharacterPosition;
        const expectedCharacterPosition = {
            x: 4,
            y: 0
        };
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
    });

    it("moves_right_to_beside_wall", () => {
        const boardData: BoardType = [
            [
                Place.Empty,
                Place.Character,
                Place.Empty,
                Place.Wall,
                Place.Empty
            ]
        ];
        const characterPosition: Position = {
            x: 1,
            y: 0
        };

        const board = new Board(Board.idCounter++, "", boardData, characterPosition, endPoint);         
        const newCharacterPosition = movementFunctions.getPositionToMoveIntoForBoard(board, Direction.Right).data.newCharacterPosition;
        const expectedCharacterPosition = {
            x: 2,
            y: 0
        };
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
    });
});
