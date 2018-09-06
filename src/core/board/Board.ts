import * as R from "ramda";
import { Place, Position, BoardType, Status } from "@/core/myTypes";

export default class Board {
    public static idCounter: number = 0;

    public readonly numberOfRows: number;
    public readonly numberOfColumns: number;

    public readonly boardSolved: boolean; 

    constructor(
        public readonly id: number,
        public readonly boardData: BoardType, 
        public readonly characterPosition: Position, 
        public readonly endPoint: Position,
        public readonly status: Status = Status.NotStarted
    ) {
        this.numberOfRows = this.boardData.length;
        this.numberOfColumns = R.nth(0, this.boardData)!.length;
        this.boardSolved = R.equals(this.characterPosition, this.endPoint);
    }

    public boardAsString = (separator: string = "\n"): string => {
        const rowsJoined = R.map(R.join(" ", ), this.boardData);
        return R.join(separator, rowsJoined);
    }

    public setCharacterPosition = (newCharacterPosition: Position): Board => new Board(this.id, this.boardData, newCharacterPosition, this.endPoint, this.status);
    
    private uncurriedGetPosition = (position: Position): Place => {   
        const row = R.nth(position.y, this.boardData)!;
        return R.nth(position.x, row)!;
    }
    
    private uncurriedSetPosition = (position: Position, newValue: Place): Board => {    
        const row = R.nth(position.y, this.boardData)!;
        const newRow = R.update(position.x, newValue, row);
        const newBoard = R.update(position.y, newRow, this.boardData);
        return new Board(this.id, newBoard, this.characterPosition, this.endPoint, this.status);
    }

    public getPosition: R.CurriedFunction1<Position, Place> = R.curry( this.uncurriedGetPosition);

    public setPosition: R.CurriedFunction2<Position, Place, Board> = R.curry(this.uncurriedSetPosition);
}
