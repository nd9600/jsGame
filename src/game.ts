import boardFunctions from "@/core/board/board";
import TestSetup from "@/shell/TestSetup";
import {Direction, GameState} from "@/core/myTypes";
import usefulFunctions from "@/core/usefulFunctions";

const setup = new TestSetup();
const [size, characterPosition, endPoint] = [setup.getSize(), setup.getStartPoint(), setup.getEndPoint()];

const board = boardFunctions.setInitialPositions(characterPosition, endPoint, boardFunctions.makeInitialBoard(size));

let gameState: GameState = {
    characterPosition,
    board
};

const boardDiv = document.getElementById("board")!;

boardDiv.innerHTML = `<pre>${boardFunctions.boardAsString(gameState.board)}</pre>`;

gameState = boardFunctions.move(usefulFunctions.errorHandler, Direction.Up, gameState);
console.log(gameState.board);
boardDiv.innerHTML = `<pre>${boardFunctions.boardAsString(gameState.board)}</pre>`;

const KEYS = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight"
};
window.addEventListener("keyup", ({code}) => {
    const KEYS_TO_DIRECTIONS: any = {};
    KEYS_TO_DIRECTIONS[KEYS.up] = Direction.Up;
    KEYS_TO_DIRECTIONS[KEYS.down] = Direction.Down;
    KEYS_TO_DIRECTIONS[KEYS.left] = Direction.Left;
    KEYS_TO_DIRECTIONS[KEYS.right] = Direction.Right;
    gameState = boardFunctions.move(usefulFunctions.errorHandler, KEYS_TO_DIRECTIONS[code], gameState);
    console.log(code);
    console.log(gameState.board);
    boardDiv.innerHTML = `<pre>${boardFunctions.boardAsString(gameState.board)}</pre>`;
});
