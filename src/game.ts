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

const gameDiv = document.getElementById("game")!;
console.log(gameDiv);
console.log(board);

gameDiv.innerHTML = `
<h1>Board</h1>
<pre>${core.boardAsString(board)}</pre>
`;
