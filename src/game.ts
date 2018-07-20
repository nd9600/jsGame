import core from "./game/core";
import {Wall, Character, Empty, End, Place, Board, twoNumbers, Position} from "./game/myTypes";

console.log(core);

/**
 * height x width
 * #rows x #columns
 *
 */
const size: twoNumbers = [10, 10];
const startPoint: Position = {
    x: 0,
    y: 0
};
const endPoint: Position = {
    x: 9,
    y: 9
};

let board = core.setInitialPositions(startPoint, endPoint, core.makeInitialBoard(size));

let gameDiv = document.getElementById("game");
console.log(gameDiv);
console.log(board);