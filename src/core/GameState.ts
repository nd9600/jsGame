import { Boards, Status } from "@/core/myTypes";
import Board from "@/core/board/Board";
import * as R from "ramda";

export default class GameState {

    public readonly status: Status;

    constructor(public readonly boards: Boards) {
        const statuses = R.pluck("status", R.values(boards));

        if (R.contains(Status.NotStarted, statuses)) {
            this.status = Status.NotStarted;
        } else if (R.all(R.equals(Status.PlacingWalls), statuses)) {
            this.status = Status.PlacingWalls;
        } else if (R.all(R.equals(Status.Playing), statuses)) {
            this.status = Status.Playing;
        } else {
            this.status = Status.Finished;
        }
    }

    public replaceBoard(newBoard: Board) {
        const newBoards = R.assoc(newBoard.id, newBoard, this.boards);
        return new GameState(newBoards);
    }
}
