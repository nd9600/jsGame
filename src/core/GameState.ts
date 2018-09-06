import { Boards } from "@/core/myTypes";
import Board from "@/core/board/Board";
import * as R from "ramda";

export default class GameState {

    constructor(public readonly boards: Boards) {}

    public replaceBoard(newBoard: Board) {
        const newBoards = R.assoc(newBoard.id, newBoard, this.boards);
        return new GameState(newBoards);
    }
}
