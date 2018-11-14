import { Command } from "@/core/@typings/EventDataTypes";
import InputEvent from "@/core/events/Game/InputEvent";
import * as R from "ramda";
const KEYS_TO_COMMANDS = {
    ArrowUp: Command.MoveUp,
    ArrowDown: Command.MoveDown,
    ArrowLeft: Command.MoveLeft,
    ArrowRight: Command.MoveRight
};
const handleUserInput = (initialGameState, player) => {
    const boardDiv = document.getElementById("board");
    let board = R.values(initialGameState.boards)[0];
    boardDiv.innerHTML = `<pre>${board.boardAsString()}</pre>`;
    let gameState = initialGameState;
    window.addEventListener("keyup", ({ code }) => {
        if (KEYS_TO_COMMANDS.hasOwnProperty(code)) {
            const inputEventData = {
                command: KEYS_TO_COMMANDS[code],
                player
            };
            const inputEvent = new InputEvent(inputEventData);
            gameState = inputEvent.handle(gameState);
            board = R.values(gameState.boards)[0];
            // console.log(code);
            console.log("gameState: ", gameState);
            // console.log(R.values(gameState.boards));
            // console.log(R.values(gameState.boards)[0]);
            // console.log("loggedEvents", window.loggedEvents);
            console.log("");
            boardDiv.innerHTML = `<pre>${board.boardAsString()}</pre>`;
        }
    });
};
export default { handleUserInput };
//# sourceMappingURL=UserInput.js.map