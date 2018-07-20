import boardFunctions from "@/game/board";
import TestSetup from "@/game/interaction/TestSetup";
import {Position, twoNumbers} from "@/game/myTypes";

const setup = new TestSetup();
let size: twoNumbers;
let startPoint: Position;
let endPoint: Position;
[size, startPoint, endPoint] = [setup.getSize(), setup.getStartPoint(), setup.getEndPoint()];

const board = boardFunctions.setInitialPositions(startPoint, endPoint, boardFunctions.makeInitialBoard(size));

const boardDiv = document.getElementById("board")!;
console.log(board);

boardDiv.innerHTML = `
<pre>${boardFunctions.boardAsString(board)}</pre>
`;
