import { Place, Position } from "@/core/myTypes";
import R from "ramda";

type BoardType = Place[][];

export default class Board {
    private data: BoardType;

    constructor(board: BoardType) {
        this.data = board;
    }

    public boardAsString = (separator: string = "\n"): string => {
        const rowsJoined = R.map(R.join(" ", ), this.data);
        return R.join(separator, rowsJoined);
    }

    private isPositionOnBoard = (position: Position): void => {
        const yIsOnBoard = (0 <= position.y) && (position.y <= this.data.length);
        const xIsOnBoard = (0 <= position.x) && (position.x <= R.nth(0, this.data)!.length);
        if (!(yIsOnBoard && xIsOnBoard)) {
            throw new Error(`position ${position} is off the board`);
        }
    }
    
    private uncurriedGetPosition = (position: Position): Place => {
        this.isPositionOnBoard(position);
    
        const row = R.nth(position.y, this.data)!;
        return R.nth(position.x, row)!;
    }
    
    private uncurriedSetPosition = (position: Position, newValue: Place): Board => {
        this.isPositionOnBoard(position);
    
        const row = R.nth(position.y, this.data)!;
        const newRow = R.update(position.x, newValue, row);
        const newBoard = R.update(position.y, newRow, this.data);
        return new Board(newBoard);
    }

    public getPosition: R.CurriedFunction1<Position, Place> = R.curry( this.uncurriedGetPosition);

    public setPosition: R.CurriedFunction2<Position, Place, Board> = R.curry(this.uncurriedSetPosition);
}
