import boardFunctions from "@/core/board/boardFunctions";
import TestSetup from "@/shell/TestSetup";
import {Direction} from "@/core/myTypes";
import Board from "@/core/board/Board";
import GameState from "@/core/GameState";

const KEYS = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight"
};

const setup = new TestSetup();
const [size, characterPosition, endPoint] = [setup.getSize(), setup.getStartPoint(), setup.getEndPoint()];

const board = new Board(boardFunctions.makeInitialBoard(size, characterPosition, endPoint), characterPosition, endPoint);

let gameState = new GameState(
    characterPosition,
    board
);

const boardDiv = document.getElementById("board")!;

boardDiv.innerHTML = `<pre>${gameState.board.boardAsString()}</pre>`;

window.addEventListener("keyup", ({code}) => {
    const KEYS_TO_DIRECTIONS: any = {};
    KEYS_TO_DIRECTIONS[KEYS.up] = Direction.Up;
    KEYS_TO_DIRECTIONS[KEYS.down] = Direction.Down;
    KEYS_TO_DIRECTIONS[KEYS.left] = Direction.Left;
    KEYS_TO_DIRECTIONS[KEYS.right] = Direction.Right;
    gameState = boardFunctions.move(gameState, KEYS_TO_DIRECTIONS[code]);
    console.log(code);
    console.log(gameState.board);
    boardDiv.innerHTML = `<pre>${gameState.board.boardAsString()}</pre>`;
});
