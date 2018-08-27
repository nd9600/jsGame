import { Position, Place, twoNumbers } from "@/core/myTypes";
import Board from "@/core/board/boardClass";

export default class GameState {
    public characterPosition: Position;
    public board: Board;

    constructor(characterPosition: Position, board: Board) {
        this.characterPosition = characterPosition;
        this.board = board;
    }
    
    public setInitialPositions = (startPoint: Position, endPoint: Position): Board => {
        return this.board
            .setPosition(startPoint, Place.Character)    
            .setPosition(endPoint, Place.End);
    }
}
