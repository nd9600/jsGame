import * as R from "ramda";
import { Command } from "@/core/myTypes";
import GameState from "@/core/GameState";
import InputEvent from "@/core/events/Game/InputEvent";

const KEYS_TO_COMMANDS: { [index: string]: Command } = {
    ArrowUp: Command.MoveUp,
    ArrowDown: Command.MoveDown,
    ArrowLeft: Command.MoveLeft,
    ArrowRight: Command.MoveRight
};

const handleUserInput = (initialGameState: GameState): void => {
    const boardDiv = document.getElementById("board")!;
    let board = R.values(initialGameState.boards)[0];
    boardDiv.innerHTML = `<pre>${board.boardAsString()}</pre>`;

    let gameState: GameState = initialGameState;
    window.addEventListener("keyup", ({code}) => {
        if (KEYS_TO_COMMANDS.hasOwnProperty(code)) {
            const inputEvent = new InputEvent(KEYS_TO_COMMANDS[code]);
            gameState = inputEvent.handle(gameState);
            board = R.values(gameState.boards)[0];

            console.log(code);
            console.log(gameState);
            console.log(R.values(gameState.boards));
            console.log(R.values(gameState.boards)[0]);
            console.log("loggedEvents", window.loggedEvents);
            console.log("");
            boardDiv.innerHTML = `<pre>${board.boardAsString()}</pre>`;
        }
    });
};

export default {handleUserInput};
