import { BoardPosition, BoardType, Place, Status } from "@/core/@typings/BoardTypes";
import BoardBuilder from "@/core/board/BoardBuilder";
import usefulFunctions from "@/core/usefulFunctions";
import * as R from "ramda";

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
        public readonly characterPosition: BoardPosition, 
        public readonly endPoint: BoardPosition,
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

    public setCharacterPosition = (characterPosition: BoardPosition): Board => BoardBuilder.mergeWithOptions(this, {characterPosition});

    public setStatus = (status: Status): Board => BoardBuilder.mergeWithOptions(this, {status});

    public toggleWallAtPosition = (positionToToggle: BoardPosition): Board => {

        // you can only toggle somewhere if the board is the PlacingWalls state, and you're trying to toggle somewhere that's empty or already has a wall
        if (this.status !== Status.PlacingWalls) {
            return this;
        }

        const thingAtPosition = this.getPosition(positionToToggle);
        if (thingAtPosition !== Place.Wall && thingAtPosition !== Place.Empty) {
            return this;
        }

        if (thingAtPosition === Place.Wall) {
            return this.setPosition(positionToToggle, Place.Empty);
        }
        
        // position must be empty now, so we're placing a wall, so we need to check if we can
        if (this.currentNumberOfWalls < this.maxNumberOfWalls) {
            return this.setPosition(positionToToggle, Place.Wall);
        }

        return this;
    }
    
    private uncurriedGetPosition = (position: BoardPosition): Place => {   
        const row = R.nth(position.y, this.boardData)!;
        return R.nth(position.x, row)!;
    }
    
    private uncurriedSetPosition = (position: BoardPosition, newValue: Place): Board => {    
        const row = R.nth(position.y, this.boardData)!;
        const newRow = R.update(position.x, newValue, row);
        const newBoard = R.update(position.y, newRow, this.boardData);
        return BoardBuilder.mergeWithOptions(this, {boardData: newBoard});
    }

    public getPosition: R.CurriedFunction1<BoardPosition, Place> = R.curry( this.uncurriedGetPosition);

    public setPosition: R.CurriedFunction2<BoardPosition, Place, Board> = R.curry(this.uncurriedSetPosition);
}
