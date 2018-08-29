import boardFunctions from "@/core/board/boardFunctions";
import TestSetup from "@/shell/TestSetup";
import {Direction} from "@/core/myTypes";
import Board from "@/core/board/Board";
import GameState from "@/core/GameState";
import InputEvent from "@/core/events/InputEvent";
import EventBus from "@/shell/EventBus";

declare global {
    interface Window { 
        eventBus: EventBus; 
    }
}

const KEYS = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight"
};

const setup = new TestSetup();
const [size, characterPosition, endPoint] = [setup.getSize(), setup.getStartPoint(), setup.getEndPoint()];

const board = new Board(Board.idCounter++, boardFunctions.makeInitialBoard(size, characterPosition, endPoint), characterPosition, endPoint);

let gameState = new GameState(
    board
);

const boardDiv = document.getElementById("board")!;
boardDiv.innerHTML = `<pre>${gameState.board.boardAsString()}</pre>`;

window.eventBus = new EventBus();
const testFunction = (direction: Direction): void => {
    console.log("input, direction: ", direction);
};
window.eventBus.addListener("Input", testFunction);

window.addEventListener("keyup", ({code}) => {
    const KEYS_TO_DIRECTIONS: any = {};
    KEYS_TO_DIRECTIONS[KEYS.up] = Direction.Up;
    KEYS_TO_DIRECTIONS[KEYS.down] = Direction.Down;
    KEYS_TO_DIRECTIONS[KEYS.left] = Direction.Left;
    KEYS_TO_DIRECTIONS[KEYS.right] = Direction.Right;

    if (KEYS_TO_DIRECTIONS.hasOwnProperty(code)) {
        const inputEvent = new InputEvent(KEYS_TO_DIRECTIONS[code]);
        gameState = inputEvent.handle(gameState);

        console.log(code);
        console.log(gameState);
        console.log(gameState.board.getBoard());
        console.log("");
        boardDiv.innerHTML = `<pre>${gameState.board.boardAsString()}</pre>`;
    }
});
