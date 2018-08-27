import { Place, Position, BoardType } from "@/core/myTypes";
import R from "ramda";

export default class Board {
    public startPoint: Position;
    public endPoint: Position;
    public numberOfRows: number;
    public numberOfColumns: number;
    
    private boardData: BoardType;

    constructor(board: BoardType, startPoint: Position, endPoint: Position) {
        this.boardData = board;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.numberOfRows = this.boardData.length;
        this.numberOfColumns = R.nth(0, this.boardData)!.length;
    }

    public getBoard = () => this.boardData;

    public boardAsString = (separator: string = "\n"): string => {
        const rowsJoined = R.map(R.join(" ", ), this.boardData);
        return R.join(separator, rowsJoined);
    }

    private isPositionOnBoard = (position: Position): void => {
        const yIsOnBoard = (0 <= position.y) && (position.y <= this.boardData.length);
        const xIsOnBoard = (0 <= position.x) && (position.x <= R.nth(0, this.boardData)!.length);
        if (!(yIsOnBoard && xIsOnBoard)) {
            throw new Error(`position ${position} is off the board`);
        }
    }
    
    private uncurriedGetPosition = (position: Position): Place => {
        this.isPositionOnBoard(position);
    
        const row = R.nth(position.y, this.boardData)!;
        return R.nth(position.x, row)!;
    }
    
    private uncurriedSetPosition = (position: Position, newValue: Place): Board => {
        this.isPositionOnBoard(position);
    
        const row = R.nth(position.y, this.boardData)!;
        const newRow = R.update(position.x, newValue, row);
        const newBoard = R.update(position.y, newRow, this.boardData);
        return new Board(newBoard, this.startPoint, this.endPoint);
    }

    public getPosition: R.CurriedFunction1<Position, Place> = R.curry( this.uncurriedGetPosition);

    public setPosition: R.CurriedFunction2<Position, Place, Board> = R.curry(this.uncurriedSetPosition);
}
