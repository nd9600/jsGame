import { BoardPosition, BoardType, Place, twoNumbers, Status } from "@/core/@typings/BoardTypes";
import Board from "@/core/board/Board";
import TestSetup from "@/shell/TestSetup";

describe("PlacingWalls", () => {
    let size: twoNumbers;
    let startPoint: BoardPosition;
    let endPoint: BoardPosition;
    let initialPlayerName: string;
    beforeEach(() => {
        const setup = new TestSetup();
        [initialPlayerName, size, startPoint, endPoint] = [
            setup.getInitialPlayerName(),
            setup.getSize(),
            setup.getStartPoint(),
            setup.getEndPoint()
        ];
    });

    it("gets_current_number_of_walls", () => {
        let boardData: BoardType = [
            [Place.Empty],
            [Place.Character],
            [Place.Wall],
            [Place.Empty],
            [Place.Empty]
        ];

        let board = new Board(
            Board.idCounter++,
            -1,
            boardData,
            startPoint,
            endPoint
        );
        expect(board.currentNumberOfWalls).toEqual(1);

        boardData = [
            [Place.Empty],
            [Place.Character],
            [Place.Empty],
            [Place.Empty],
            [Place.Empty]
        ];

        board = new Board(
            Board.idCounter++,
            -1,
            boardData,
            startPoint,
            endPoint
        );
        expect(board.currentNumberOfWalls).toEqual(0);

        boardData = [
            [Place.Wall],
            [Place.Wall],
            [Place.Empty],
            [Place.Empty],
            [Place.Wall]
        ];

        board = new Board(
            Board.idCounter++,
            -1,
            boardData,
            startPoint,
            endPoint
        );
        expect(board.currentNumberOfWalls).toEqual(3);
    });

    it("cant_toggle_wall_when_status_is_wrong", () => {
        const boardData: BoardType = [
            [Place.Empty],
            [Place.Character],
            [Place.Empty],
            [Place.Empty],
            [Place.Empty]
        ];

        const board = new Board(
            Board.idCounter++,
            -1,
            boardData,
            startPoint,
            endPoint
        );

        const newBoard = board.toggleWallAtPosition({x: 0, y: 2});

        expect(newBoard.boardData).toEqual(board.boardData);
    });

    it("cant_toggle_when_setting_wrong_place", () => {
        const boardData: BoardType = [
            [Place.Empty],
            [Place.Character],
            [Place.Wall],
            [Place.Empty],
            [Place.Empty]
        ];

        const board = new Board(
            Board.idCounter++,
            -1,
            boardData,
            startPoint,
            endPoint
        );
        const newBoard = board.setStatus(Status.PlacingWalls)
            .toggleWallAtPosition({x: 0, y: 1});

        expect(newBoard.boardData).toEqual(board.boardData);
    });

    it("cant_toggle_when_max_walls", () => {
        const boardData: BoardType = [
            [Place.Wall],
            [Place.Wall],
            [Place.Empty],
            [Place.Empty],
            [Place.Empty]
        ];

        const board = new Board(
            Board.idCounter++,
            -1,
            boardData,
            startPoint,
            endPoint
        );
        const newBoard = board.setStatus(Status.PlacingWalls)
            .toggleWallAtPosition({x: 0, y: 2});

        expect(newBoard.boardData).toEqual(board.boardData);
    });

    it("cant_toggle_when_start_or_end_point", () => {
        const boardData: BoardType = [
            [Place.Wall],
            [Place.Wall],
            [Place.Empty],
            [Place.Empty],
            [Place.Wall]
        ];

        const board = new Board(
            Board.idCounter++,
            -1,
            boardData,
            startPoint,
            endPoint
        );
        const newBoard = board.setStatus(Status.PlacingWalls)
            .toggleWallAtPosition(startPoint)
            .toggleWallAtPosition(endPoint);

        expect(newBoard.boardData).toEqual(board.boardData);
    });

    it("sets_wall", () => {
        const boardData: BoardType = [
            [Place.Empty],
            [Place.Character],
            [Place.Wall],
            [Place.Empty],
            [Place.Empty]
        ];

        const board = new Board(
            Board.idCounter++,
            -1,
            boardData,
            startPoint,
            endPoint
        );
        const newBoard = board.setStatus(Status.PlacingWalls)
            .toggleWallAtPosition({x: 0, y: 3});

        const wantedBoardData = [
            [Place.Empty],
            [Place.Character],
            [Place.Wall],
            [Place.Wall],
            [Place.Empty]
        ];

        expect(newBoard.boardData).toEqual(wantedBoardData);
    });

    it("sets_empty_space", () => {
        const boardData: BoardType = [
            [Place.Empty],
            [Place.Character],
            [Place.Wall],
            [Place.Empty],
            [Place.Empty]
        ];

        const board = new Board(
            Board.idCounter++,
            -1,
            boardData,
            startPoint,
            endPoint
        );
        const newBoard = board.setStatus(Status.PlacingWalls)
            .toggleWallAtPosition({x: 0, y: 2});

        const wantedBoardData = [
            [Place.Empty],
            [Place.Character],
            [Place.Empty],
            [Place.Empty],
            [Place.Empty]
        ];

        expect(newBoard.boardData).toEqual(wantedBoardData);
    });
});
