import boardFunctions from "@/core/board/boardFunctions";
import {Place, BoardType, twoNumbers, Position} from "@/core/myTypes";
import Board from "@/core/board/Board";

describe("BoardSetup", () => {
    // beforeEach(() => {
    // });

    it("makes_initial_board", () => {
        const size: [number, number] = [10, 10];
        const startPoint: Position = {
            x: 0,
            y: 0
        };
        const endPoint: Position = {
            x: 9,
            y: 9
        };

        const board = boardFunctions.makeInitialBoard(size, startPoint, endPoint);
        const wantedBoard = [[Place.Character, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.End]
        ];
        expect(board).toEqual(wantedBoard);
    });
});
