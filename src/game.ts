import board from "@/game/board";
import TestSetup from "@/game/interaction/TestSetup";
import {Position, twoNumbers} from "@/game/myTypes";

console.log(board);

const setup = new TestSetup();
let size: twoNumbers;
let startPoint: Position;
let endPoint: Position;
[size, startPoint, endPoint] = [setup.getSize(), setup.getStartPoint(), setup.getEndPoint()];

let board = board.setInitialPositions(startPoint, endPoint, board.makeInitialBoard(size));

const boardDiv = document.getElementById("board")!;
console.log(board);

boardDiv.innerHTML = `
<pre>${board.boardAsString(board)}</pre>
`;
