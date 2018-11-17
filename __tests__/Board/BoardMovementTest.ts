import { BoardPosition, BoardType, Place, Status } from "@/core/@typings/BoardTypes";
import { Direction } from "@/core/@typings/EventDataTypes";
import Board from "@/core/board/Board";
import movementFunctions from "@/core/board/movement";
import SuccessfulMovementEvent from "@/core/events/Movement/SuccessfulMovementEvent";
import GameStateFactory from "@/core/factories/GameStateFactory";
import PlayerBoard from "@/core/player/PlayerBoard";
import * as R from "ramda";

describe("BoardMovementUp", () => {
    const endPoint = {
        x: 9001,
        y: 9001
    };

    it("applies_successful_movement_event", () => {
        const boardData: BoardType = [
            [Place.Empty],
            [Place.Character],
            [Place.Empty],
            [Place.Empty],
            [Place.Empty]
        ];
        const characterPosition: BoardPosition = {
            x: 0,
            y: 1
        };
        const playerID = 0;

        const initialBoard = new Board(Board.idCounter++, playerID, boardData, characterPosition, endPoint);
        let gameState = GameStateFactory.createGameState({
            boards: [initialBoard]
        });

        const expectedCharacterPosition = {
            x: 0,
            y: 0
        };
        const board = R.values(gameState.boards)[0];
        const movementEvent = new SuccessfulMovementEvent({boardID: board.id, playerID, newCharacterPosition: expectedCharacterPosition});
        gameState = movementEvent.handle(gameState);
        
        const newPlayerBoard = gameState.getPlayerBoard(playerID, initialBoard.id);
        expect(newPlayerBoard.characterPosition).toEqual(expectedCharacterPosition);
    });

    it("moves_up_from_one_below_top", () => {
        const boardData: BoardType = [
            [Place.Empty],
            [Place.Character],
            [Place.Empty],
            [Place.Empty],
            [Place.Empty]
        ];
        const characterPosition: BoardPosition = {
            x: 0,
            y: 1
        };
        const playerID = 0;
        const board = new Board(Board.idCounter++, playerID, boardData, characterPosition, endPoint);         
        const playerBoard = new PlayerBoard(playerID, board.id, characterPosition, Status.NotStarted);

        const newCharacterPosition = movementFunctions.getPositionToMoveIntoForBoard(board, playerBoard, Direction.Up).data.newCharacterPosition;
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
        const characterPosition: BoardPosition = {
            x: 0,
            y: 4
        };

        const playerID = 0;
        const board = new Board(Board.idCounter++, playerID, boardData, characterPosition, endPoint);         
        const playerBoard = new PlayerBoard(playerID, board.id, characterPosition, Status.NotStarted);
        const newCharacterPosition = movementFunctions.getPositionToMoveIntoForBoard(board, playerBoard, Direction.Up).data.newCharacterPosition;
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
        const characterPosition: BoardPosition = {
            x: 0,
            y: 1
        };

        const playerID = 0;
        const board = new Board(Board.idCounter++, playerID, boardData, characterPosition, endPoint);         
        const playerBoard = new PlayerBoard(playerID, board.id, characterPosition, Status.NotStarted);

        const errorReturned = movementFunctions.getPositionToMoveIntoForBoard(board, playerBoard, Direction.Up).data;
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
        const characterPosition: BoardPosition = {
            x: 0,
            y: 2
        };

        const playerID = 0;
        const board = new Board(Board.idCounter++, playerID, boardData, characterPosition, endPoint);         
        const playerBoard = new PlayerBoard(playerID, board.id, characterPosition, Status.NotStarted);

        const errorReturned = movementFunctions.getPositionToMoveIntoForBoard(board, playerBoard,  Direction.Up).data;
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
        const characterPosition: BoardPosition = {
            x: 0,
            y: 4
        };

        const playerID = 0;
        const board = new Board(Board.idCounter++, playerID, boardData, characterPosition, endPoint);         
        const playerBoard = new PlayerBoard(playerID, board.id, characterPosition, Status.NotStarted);

        const newCharacterPosition = movementFunctions.getPositionToMoveIntoForBoard(board, playerBoard, Direction.Up).data.newCharacterPosition;
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
        const characterPosition: BoardPosition = {
            x: 0,
            y: 3
        };

        const playerID = 0;
        const initialBoard = new Board(Board.idCounter++, playerID, boardData, characterPosition, endPoint);
        let gameState = GameStateFactory.createGameState({boards: [initialBoard]});

        const expectedCharacterPosition = {
            x: 0,
            y: 4
        };
        const board = R.values(gameState.boards)[0];
        
        const movementEvent = new SuccessfulMovementEvent({boardID: board.id, playerID, newCharacterPosition: expectedCharacterPosition});
        gameState = movementEvent.handle(gameState);
        const newPlayerBoard = gameState.getPlayerBoard(playerID, initialBoard.id);
        expect(newPlayerBoard.characterPosition).toEqual(expectedCharacterPosition);
        const newCharacterPosition = newPlayerBoard.characterPosition;
        
        expect(newCharacterPosition).toEqual(expectedCharacterPosition); 
    });

    it("moves_down_from_top", () => {
        const boardData: BoardType = [
            [Place.Character],
            [Place.Empty],
            [Place.Empty],
            [Place.Empty],
            [Place.Empty]
        ];
        const characterPosition: BoardPosition = {
            x: 0,
            y: 0
        };

        const playerID = 0;
        const board = new Board(Board.idCounter++, playerID, boardData, characterPosition, endPoint);         
        const playerBoard = new PlayerBoard(playerID, board.id, characterPosition, Status.NotStarted);

        const newCharacterPosition = movementFunctions.getPositionToMoveIntoForBoard(board, playerBoard, Direction.Down).data.newCharacterPosition;
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
        const characterPosition: BoardPosition = {
            x: 0,
            y: 3
        };

        const playerID = 0;
        const board = new Board(Board.idCounter++, playerID, boardData, characterPosition, endPoint);         
        const playerBoard = new PlayerBoard(playerID, board.id, characterPosition, Status.NotStarted);

        const errorReturned = movementFunctions.getPositionToMoveIntoForBoard(board, playerBoard, Direction.Down).data;
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
        const characterPosition: BoardPosition = {
            x: 0,
            y: 2
        };

        const playerID = 0;
        const board = new Board(Board.idCounter++, playerID, boardData, characterPosition, endPoint);         
        const playerBoard = new PlayerBoard(playerID, board.id, characterPosition, Status.NotStarted);

        const errorReturned = movementFunctions.getPositionToMoveIntoForBoard(board, playerBoard, Direction.Down).data;
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
        const characterPosition: BoardPosition = {
            x: 0,
            y: 1
        };

        const playerID = 0;
        const board = new Board(Board.idCounter++, playerID, boardData, characterPosition, endPoint);         
        const playerBoard = new PlayerBoard(playerID, board.id, characterPosition, Status.NotStarted);

        const newCharacterPosition = movementFunctions.getPositionToMoveIntoForBoard(board, playerBoard, Direction.Down).data.newCharacterPosition;
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
        const characterPosition: BoardPosition = {
            x: 4,
            y: 0
        };

        const playerID = 0;
        const board = new Board(Board.idCounter++, playerID, boardData, characterPosition, endPoint);
        const playerBoard = new PlayerBoard(playerID, board.id, characterPosition, Status.NotStarted);

        const newCharacterPosition = movementFunctions.getPositionToMoveIntoForBoard(board, playerBoard, Direction.Left).data.newCharacterPosition;
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
        const characterPosition: BoardPosition = {
            x: 3,
            y: 0
        };

        const playerID = 0;
        const board = new Board(Board.idCounter++, playerID, boardData, characterPosition, endPoint);         
        const playerBoard = new PlayerBoard(playerID, board.id, characterPosition, Status.NotStarted);

        const newCharacterPosition = movementFunctions.getPositionToMoveIntoForBoard(board, playerBoard, Direction.Left).data.newCharacterPosition;
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
        const characterPosition: BoardPosition = {
            x: 0,
            y: 0
        };

        const playerID = 0;
        const board = new Board(Board.idCounter++, playerID, boardData, characterPosition, endPoint);         
        const playerBoard = new PlayerBoard(playerID, board.id, characterPosition, Status.NotStarted);

        const newCharacterPosition = movementFunctions.getPositionToMoveIntoForBoard(board, playerBoard, Direction.Right).data.newCharacterPosition;
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
        const characterPosition: BoardPosition = {
            x: 1,
            y: 0
        };

        const playerID = 0;
        const board = new Board(Board.idCounter++, playerID, boardData, characterPosition, endPoint);         
        const playerBoard = new PlayerBoard(playerID, board.id, characterPosition, Status.NotStarted);

        const newCharacterPosition = movementFunctions.getPositionToMoveIntoForBoard(board, playerBoard, Direction.Right).data.newCharacterPosition;
        const expectedCharacterPosition = {
            x: 2,
            y: 0
        };
        expect(newCharacterPosition).toEqual(expectedCharacterPosition);
    });
});
