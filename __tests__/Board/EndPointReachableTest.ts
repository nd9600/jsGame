import { BoardPosition, Place } from "@/core/@typings/BoardTypes";
import Board from "@/core/board/Board";

describe("EndPointIsReachable", () => {

    it("returns true when endpoint is reachable", () => {
        let board = new Board(Board.idCounter++, -1, [
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
        ], {x: 0, y: 0}, {x: 3, y: 3});
        expect(board.endPointIsReachableFromStart()).toBeTruthy();
    });

    it("returns false when endpoint isnt reachable", () => {
        let board = new Board(Board.idCounter++, -1, [
            [Place.Empty, Place.Wall, Place.Empty, Place.Empty],
            [Place.Empty, Place.Wall, Place.Empty, Place.Empty],
            [Place.Empty, Place.Wall, Place.Empty, Place.Empty],
            [Place.Empty, Place.Wall, Place.Empty, Place.Empty],
        ], {x: 0, y: 0}, {x: 3, y: 3});
        expect(board.endPointIsReachableFromStart()).toBeFalsy();
    });
});
