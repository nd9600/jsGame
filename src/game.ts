import boardFunctions from "@/game/board/board";
import TestSetup from "@/game/interaction/TestSetup";
import {Position, twoNumbers, Direction, GameState, IError} from "@/game/myTypes";
import usefulFunctions from "@/game/usefulFunctions";

const setup = new TestSetup();
let size: twoNumbers;
let characterPosition: Position;
let endPoint: Position;
[size, characterPosition, endPoint] = [setup.getSize(), setup.getStartPoint(), setup.getEndPoint()];

const board = boardFunctions.setInitialPositions(characterPosition, endPoint, boardFunctions.makeInitialBoard(size));

let gameState: GameState = {
    characterPosition,
    board
};

const boardDiv = document.getElementById("board")!;

boardDiv.innerHTML = `<pre>${boardFunctions.boardAsString(gameState.board)}</pre>`;

gameState = boardFunctions.move(usefulFunctions.errorHandler, Direction.Up, gameState);
gameState = boardFunctions.move(usefulFunctions.errorHandler, Direction.Up, gameState);
console.log(gameState.board);
boardDiv.innerHTML = `<pre>${boardFunctions.boardAsString(gameState.board)}</pre>`;

window.addEventListener("keyup", (event) => {
    switch (event.keyCode) {
        case 38: {
            gameState = boardFunctions.move(usefulFunctions.errorHandler, Direction.Up, gameState);
            break;
        } case 40: {
            gameState = boardFunctions.move(usefulFunctions.errorHandler, Direction.Down, gameState);
            break;
        } case 37: {
            gameState = boardFunctions.move(usefulFunctions.errorHandler, Direction.Left, gameState);
            break;
        } case 39: {
            gameState = boardFunctions.move(usefulFunctions.errorHandler, Direction.Right, gameState);
            break;
        }
    }
    console.log(gameState.board);
    boardDiv.innerHTML = `<pre>${boardFunctions.boardAsString(gameState.board)}</pre>`;
});
