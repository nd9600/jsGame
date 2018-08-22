import boardFunctions from "@/game/board/board";
import TestSetup from "@/game/interaction/TestSetup";
import {Position, twoNumbers, Direction, GameState, IError} from "@/game/myTypes";
import usefulFunctions from "@/game/usefulFunctions";

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
window.addEventListener("keyup", (event) => {
    switch (event.code) {
        case KEYS.up: {
            gameState = boardFunctions.move(usefulFunctions.errorHandler, Direction.Up, gameState);
            break;
        } case KEYS.down: {
            gameState = boardFunctions.move(usefulFunctions.errorHandler, Direction.Down, gameState);
            break;
        } case KEYS.left: {
            gameState = boardFunctions.move(usefulFunctions.errorHandler, Direction.Left, gameState);
            break;
        } case KEYS.right: {
            gameState = boardFunctions.move(usefulFunctions.errorHandler, Direction.Right, gameState);
            break;
        }
    }
    console.log(event.code);
    console.log(gameState.board);
    boardDiv.innerHTML = `<pre>${boardFunctions.boardAsString(gameState.board)}</pre>`;
});
