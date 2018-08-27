import Board from "@/core/board/Board";

export default class GameState {
    public board: Board;

    constructor(board: Board) {
        this.board = board;
    }
}
