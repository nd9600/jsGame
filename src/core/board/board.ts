import * as R from "ramda";
import { Place, twoNumbers, BoardType } from "@/core/myTypes";
import movementFunctions from "./movement";
function makeInitialBoard(size: twoNumbers): BoardType {
    const row = R.map(R.always(Place.Empty), [...Array(size[0])]);
    const board: BoardType = R.map(R.always(row), [...Array(size[1])]);
    return board;
}

export default R.merge({makeInitialBoard}, movementFunctions);
