import core from "@/game/core";
import TestSetup from "@/game/interaction/TestSetup";
import {Position, twoNumbers} from "@/game/myTypes";

console.log(core);

const setup = new TestSetup();
let size: twoNumbers;
let startPoint: Position;
let endPoint: Position;
[size, startPoint, endPoint] = [setup.getSize(), setup.getStartPoint(), setup.getEndPoint()];

let board = core.setInitialPositions(startPoint, endPoint, core.makeInitialBoard(size));

const boardDiv = document.getElementById("board")!;
console.log(board);

boardDiv.innerHTML = `
<pre>${core.boardAsString(board)}</pre>
`;
