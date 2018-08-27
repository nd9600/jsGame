import { Position, Place } from "@/core/myTypes";
import Board from "@/core/board/Board";

export default class GameState {
    public board: Board;

    constructor(board: Board) {
        this.board = board;
    }
    
    public setInitialPositions = (startPoint: Position, endPoint: Position): Board => {
        return this.board
            .setPosition(startPoint, Place.Character)    
            .setPosition(endPoint, Place.End);
    }
}
