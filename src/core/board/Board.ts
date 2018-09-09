import { BoardType, Place, Position, Status } from "@/core/myTypes";
import * as R from "ramda";
import BoardBuilder from "@/core/board/BoardBuilder";
import usefulFunctions from "@/core/usefulFunctions";

export default class Board {
    public static idCounter: number = 0;

    public readonly numberOfRows: number;
    public readonly numberOfColumns: number;

    public readonly boardSolved: boolean;

    public static MAX_NUMBER_OF_WALLS_FACTOR = 0.5;
    public readonly maxNumberOfWalls: number;
    public readonly currentNumberOfWalls: number;

    constructor(
        public readonly id: number,
        public readonly player: string,
        public readonly boardData: BoardType, 
        public readonly characterPosition: Position, 
        public readonly endPoint: Position,
        public readonly status: Status = Status.NotStarted
    ) {
        this.numberOfRows = this.boardData.length;
        this.numberOfColumns = R.nth(0, this.boardData)!.length;
        this.boardSolved = R.equals(this.characterPosition, this.endPoint);

        this.maxNumberOfWalls = Math.floor(this.numberOfRows * this.numberOfColumns * Board.MAX_NUMBER_OF_WALLS_FACTOR);
        this.currentNumberOfWalls = usefulFunctions.countNumberOf(Place.Wall, R.flatten(this.boardData));
    }

    public boardAsString = (separator: string = "\n"): string => {
        const rowsJoined = R.map(R.join(" ", ), this.boardData);
        return R.join(separator, rowsJoined);
    }

    public setCharacterPosition = (characterPosition: Position): Board => BoardBuilder.mergeWithOptions(this, {characterPosition});

    public setStatus = (status: Status): Board => BoardBuilder.mergeWithOptions(this, {status});
    
    private uncurriedGetPosition = (position: Position): Place => {   
        const row = R.nth(position.y, this.boardData)!;
        return R.nth(position.x, row)!;
    }
    
    private uncurriedSetPosition = (position: Position, newValue: Place): Board => {    
        const row = R.nth(position.y, this.boardData)!;
        const newRow = R.update(position.x, newValue, row);
        const newBoard = R.update(position.y, newRow, this.boardData);
        return BoardBuilder.mergeWithOptions(this, {boardData: newBoard});
    }

    public getPosition: R.CurriedFunction1<Position, Place> = R.curry( this.uncurriedGetPosition);

    public setPosition: R.CurriedFunction2<Position, Place, Board> = R.curry(this.uncurriedSetPosition);
}
