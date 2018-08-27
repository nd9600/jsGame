import boardFunctions from "@/core/board/board";
import {Place, BoardType, twoNumbers, Position} from "@/core/myTypes";
import Board from "@/core/board/boardClass";

describe("BoardSetup", () => {
    // beforeEach(() => {
    // });

    it("creates_empty_board", () => {
        const size: twoNumbers = [10, 10];

        const board = boardFunctions.makeInitialBoard(size);
        const wantedBoard = [[Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty]
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

        const emptyBoard: BoardType = [[Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty]
        ];
        const board = new Board(emptyBoard, startPoint, endPoint);
        const wantedBoard = [[Place.Character, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.End]
        ];
        expect(board.getBoard()).toEqual(wantedBoard);
    });
});
