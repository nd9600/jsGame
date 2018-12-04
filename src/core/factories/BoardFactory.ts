import { BoardPosition, BoardType, Place, twoNumbers } from "@/core/@typings/BoardTypes";
import * as R from "ramda";

export default class BoardFactory {
    public static makeInitialBoard(size: twoNumbers, startPoint: BoardPosition, endPoint: BoardPosition): BoardType {
        const numberOfRows = size[0];
        const numberOfColumns = size[1];
        const initialRow = R.map(R.always(Place.Empty), [...Array(numberOfColumns)]);
        const initialBoard: BoardType = R.map(R.always(initialRow), [...Array(numberOfRows)]);
    
        return initialBoard;
    }
}
