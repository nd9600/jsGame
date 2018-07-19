import core from "./game/core";
import {Wall, Character, Empty, End, Place, Board, twoNumbers, Position} from "./game/myTypes";

console.log(core);

/** 
 * height x width 
 * #rows x #columns
 * */
let size: twoNumbers = [10, 10];
let startPoint: Position = {
    x: 0,
    y: 0
};
let endPoint: Position = {
    x: 9,
    y: 9
};

let board = core.makeInitialBoard(size, startPoint, endPoint);

let gameDiv = document.getElementById("game");
console.log(gameDiv);
console.log(board);