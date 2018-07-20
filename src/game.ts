import boardFunctions from "@/game/board/board";
import TestSetup from "@/game/interaction/TestSetup";
import {Position, twoNumbers, Direction} from "@/game/myTypes";

const setup = new TestSetup();
let size: twoNumbers;
let startPoint: Position;
let endPoint: Position;
[size, startPoint, endPoint] = [setup.getSize(), setup.getStartPoint(), setup.getEndPoint()];

let board = boardFunctions.setInitialPositions(startPoint, endPoint, boardFunctions.makeInitialBoard(size));

const boardDiv = document.getElementById("board")!;

boardDiv.innerHTML = `<pre>${boardFunctions.boardAsString(board)}</pre>`;

const fromPosition: Position = {
    x: 0,
    y: 9
};
board = boardFunctions.move(fromPosition, Direction.Up, board);
console.log(board);
// boardDiv.innerHTML = `<pre>${boardFunctions.boardAsString(board)}</pre>`;
