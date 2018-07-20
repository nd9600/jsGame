import * as R from "ramda";
import boardFunctions from "@/game/board";
import { Wall, Character, Empty, End, Place, Board, twoNumbers, Position } from "@/game/myTypes";

describe("BoardSetup", () => {
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
        const board: Board = [["c", "x", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", "x"], [" ", " ", " ", " ", " ", " ", " ", " ", " ", "end"]];
        let p: Position = {
            x: 0,
            y: 0
        };
        expect(boardFunctions.getPosition(p, board)).toEqual("c");

        p = {
            x: 1,
            y: 0
        };
        expect(boardFunctions.getPosition(p, board)).toEqual("x");

        p = {
            x: 0,
            y: 1
        };
        expect(boardFunctions.getPosition(p, board)).toEqual(" ");

        p = {
            x: 9,
            y: 9
        };
        expect(boardFunctions.getPosition(p, board)).toEqual("end");

        p = {
            x: 9,
            y: 8
        };
        expect(boardFunctions.getPosition(p, board)).toEqual("x");

        p = {
            x: 8,
            y: 9
        };
        expect(boardFunctions.getPosition(p, board)).toEqual(" ");
    });

    it("sets_positions", () => {
        const board: Board = [[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]];
        let p: Position = {
            x: 0,
            y: 0
        };
        let newValue: Place = "c";
        assertPositionIsChanged(p, newValue, board);

        p = {
            x: 1,
            y: 0
        };
        newValue = "x";
        assertPositionIsChanged(p, newValue, board);

        p = {
            x: 0,
            y: 1
        };
        newValue = "x";
        assertPositionIsChanged(p, newValue, board);

        p = {
            x: 9,
            y: 9
        };
        newValue = "end";
        assertPositionIsChanged(p, newValue, board);

        p = {
            x: 9,
            y: 8
        };
        newValue = "x";
        assertPositionIsChanged(p, newValue, board);

        p = {
            x: 8,
            y: 9
        };
        newValue = " ";
        assertPositionIsChanged(p, newValue, board);
    });
});
