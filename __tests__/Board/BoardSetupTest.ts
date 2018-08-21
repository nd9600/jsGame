import boardFunctions from "@/game/board/board";
import {Place, Board, twoNumbers, Position} from "@/game/myTypes";

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

        const emptyBoard: Board = [[Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty]
        ];
        const board = boardFunctions.setInitialPositions(startPoint, endPoint, emptyBoard);
        const wantedBoard = [[Place.Character, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty], [Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.Empty, Place.End]
        ];
        expect(board).toEqual(wantedBoard);
    });
});
