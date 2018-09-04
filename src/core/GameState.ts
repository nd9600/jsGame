import { Boards } from "@/core/myTypes";
import Board from "@/core/board/Board";
import * as R from "ramda";

export default class GameState {
    public boards: Boards;

    constructor(boards: Boards) {
        this.boards = boards;
    }

    public replaceBoard(newBoard: Board) {
        const newBoards = R.assoc(newBoard.id, newBoard, this.boards);
        return new GameState(newBoards);
    }
}
