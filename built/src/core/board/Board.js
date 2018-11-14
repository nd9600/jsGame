import { Place, Status } from "@/core/@typings/BoardTypes";
import BoardBuilder from "@/core/board/BoardBuilder";
import usefulFunctions from "@/core/usefulFunctions";
import * as R from "ramda";
export default class Board {
    constructor(id, creatorID, boardData, startPoint, endPoint, status = Status.NotStarted) {
        this.id = id;
        this.creatorID = creatorID;
        this.boardData = boardData;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.status = status;
        this.boardAsString = (separator = "\n") => {
            const rowsJoined = R.map(R.join(" "), this.boardData);
            return R.join(separator, rowsJoined);
        };
        this.setStartPoint = (startPoint) => BoardBuilder.mergeWithOptions(this, { startPoint });
        this.setStatus = (status) => BoardBuilder.mergeWithOptions(this, { status });
        this.toggleWallAtPosition = (positionToToggle) => {
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
        };
        this.uncurriedGetPosition = (position) => {
            const row = R.nth(position.y, this.boardData);
            return R.nth(position.x, row);
        };
        this.uncurriedSetPosition = (position, newValue) => {
            const row = R.nth(position.y, this.boardData);
            const newRow = R.update(position.x, newValue, row);
            const newBoard = R.update(position.y, newRow, this.boardData);
            return BoardBuilder.mergeWithOptions(this, { boardData: newBoard });
        };
        this.getPosition = R.curry(this.uncurriedGetPosition);
        this.setPosition = R.curry(this.uncurriedSetPosition);
        this.numberOfRows = this.boardData.length;
        this.numberOfColumns = R.nth(0, this.boardData).length;
        this.maxNumberOfWalls = Math.floor(this.numberOfRows * this.numberOfColumns * Board.MAX_NUMBER_OF_WALLS_FACTOR);
        this.currentNumberOfWalls = usefulFunctions.countNumberOf(Place.Wall, R.flatten(this.boardData));
    }
}
Board.idCounter = 0;
Board.MAX_NUMBER_OF_WALLS_FACTOR = 0.5;
//# sourceMappingURL=Board.js.map