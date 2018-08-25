import * as R from "ramda";
import boardFunctions from "@/game/board/board";
import { Place, Board, twoNumbers, Position } from "@/game/myTypes";

describe("BoardPositionGettingAndSetting", () => {
    // beforeEach(() => {
    // });

    const assertPositionIsChanged = (p: Position, newValue: Place, board: Board): void => {
        expect(
            R.compose(
                boardFunctions.getPosition(p),
                boardFunctions.setPosition(p, newValue)
            )(board)
        ).toEqual(newValue);
    };

    it("gets_positions", () => {
        const board: Board = [[Place.Character, Place.Wall, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Wall], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.End]];
        let p: Position = {
            x: 0,
            y: 0
        };
        expect(boardFunctions.getPosition(p, board)).toEqual(Place.Character);

        p = {
            x: 1,
            y: 0
        };
        expect(boardFunctions.getPosition(p, board)).toEqual(Place.Wall);

        p = {
            x: 0,
            y: 1
        };
        expect(boardFunctions.getPosition(p, board)).toEqual(Place.Empty);

        p = {
            x: 9,
            y: 9
        };
        expect(boardFunctions.getPosition(p, board)).toEqual(Place.End);

        p = {
            x: 9,
            y: 8
        };
        expect(boardFunctions.getPosition(p, board)).toEqual(Place.Wall);

        p = {
            x: 8,
            y: 9
        };
        expect(boardFunctions.getPosition(p, board)).toEqual(Place.Empty);
    });

    it("sets_positions", () => {
        const board: Board = [[Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty]];
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
