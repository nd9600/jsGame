import boardFunctions from "@/game/board/board";
import {Wall, Character, Empty, End, Place, Board, twoNumbers, Position} from "@/game/myTypes";

describe("BoardSetup", () => {
    // beforeEach(() => {
    // });

    it("creates_empty_board", () => {
        const size: twoNumbers = [10, 10];

        const board = boardFunctions.makeInitialBoard(size);
        const wantedBoard = [[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
        ];
        expect(board).toEqual(wantedBoard);
    });

    it("sets_initial_positions", () => {
        const startPoint: Position = {
            x: 0,
            y: 0
        };
        const endPoint: Position = {
            x: 9,
            y: 9
        };

        const emptyBoard: Board = [[" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
        ];
        const board = boardFunctions.setInitialPositions(startPoint, endPoint, emptyBoard);
        const wantedBoard = [["c", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "], [" ", " ", " ", " ", " ", " ", " ", " ", " ", "end"]
        ];
        expect(board).toEqual(wantedBoard);
    });
});
