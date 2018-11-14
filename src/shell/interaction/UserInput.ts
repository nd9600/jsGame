import { Command, InputEventData } from "@/core/@typings/EventDataTypes";
import InputEvent from "@/core/events/Game/InputEvent";
import GameState from "@/core/GameState";
import Player from "@/core/player/Player";
import * as R from "ramda";

const KEYS_TO_COMMANDS: { [index: string]: Command } = {
    ArrowUp: Command.MoveUp,
    ArrowDown: Command.MoveDown,
    ArrowLeft: Command.MoveLeft,
    ArrowRight: Command.MoveRight
};

const handleUserInput = (initialGameState: GameState, player: Player): void => {
    const boardDiv = document.getElementById("board")!;
    let board = R.values(initialGameState.boards)[0];
    boardDiv.innerHTML = `<pre>${board.boardAsString()}</pre>`;

    let gameState: GameState = initialGameState;
    window.addEventListener("keyup", ({code}) => {
        if (KEYS_TO_COMMANDS.hasOwnProperty(code)) {
            const inputEventData: InputEventData = {
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

export default {handleUserInput};
