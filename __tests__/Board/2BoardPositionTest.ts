import * as R from "ramda";
import boardFunctions from "@/core/board/board";
import { Place, BoardType, twoNumbers, Position } from "@/core/myTypes";
import Board from "@/core/board/boardClass";
import TestSetup from "@/shell/TestSetup";

describe("BoardPositionGettingAndSetting", () => {
    let _;
    let characterPosition: Position;
    let endPoint: Position;
    beforeEach(() => {
        const setup = new TestSetup();
        [_, characterPosition, endPoint] = [setup.getSize(), setup.getStartPoint(), setup.getEndPoint()];
    });

    const assertPositionIsChanged = (p: Position, newValue: Place, board: Board): void => {
        expect(
            board.setPosition(p, newValue)
                .getPosition(p)
        ).toEqual(newValue);
    };

    it("gets_positions", () => {
        const boardData: BoardType = [[Place.Character, Place.Wall, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Wall], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.End]];
        const board = new Board(boardData, characterPosition, endPoint);
        let p: Position = {
            x: 0,
            y: 0
        };
        expect(board.getPosition(p)).toEqual(Place.Character);

        p = {
            x: 1,
            y: 0
        };
        expect(board.getPosition(p)).toEqual(Place.Wall);

        p = {
            x: 0,
            y: 1
        };
        expect(board.getPosition(p)).toEqual(Place.Empty);

        p = {
            x: 9,
            y: 9
        };
        expect(board.getPosition(p)).toEqual(Place.End);

        p = {
            x: 9,
            y: 8
        };
        expect(board.getPosition(p)).toEqual(Place.Wall);

        p = {
            x: 8,
            y: 9
        };
        expect(board.getPosition(p)).toEqual(Place.Empty);
    });

    it("sets_positions", () => {
        const boardData: BoardType = [[Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty]];
        const board = new Board(boardData, characterPosition, endPoint);
        let p: Position = {
            x: 0,
            y: 0
        };
        let newValue: Place = Place.Character;
        assertPositionIsChanged(p, newValue, board);

        p = {
            x: 1,
            y: 0
        };
        newValue = Place.Wall;
        assertPositionIsChanged(p, newValue, board);

        p = {
            x: 0,
            y: 1
        };
        newValue = Place.Wall;
        assertPositionIsChanged(p, newValue, board);

        p = {
            x: 9,
            y: 9
        };
        newValue = Place.End;
        assertPositionIsChanged(p, newValue, board);

        p = {
            x: 9,
            y: 8
        };
        newValue = Place.Wall;
        assertPositionIsChanged(p, newValue, board);

        p = {
            x: 8,
            y: 9
        };
        newValue = Place.Empty;
        assertPositionIsChanged(p, newValue, board);
    });
});
