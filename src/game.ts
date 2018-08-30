import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import InputEvent from "@/core/events/Game/InputEvent";
import { Direction, DispatchedEvent, EventCallback } from "@/core/myTypes";
import usefulFunctions from "@/core/usefulFunctions";
import DefaultGameSetup from "@/shell/DefaultGameSetup";
import EventBus from "@/shell/EventBus";

const KEYS = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight"
};

window.eventBus = new EventBus();
window.loggedEvents  = [];
const eventLogger: EventCallback = (dispatchedEvent: DispatchedEvent): void => {
    window.loggedEvents.push(dispatchedEvent);
    console.log("event, data: ", dispatchedEvent.data);
};
window.eventBus.addListenerToMultipleEvents(["InitialSetupEvent", "InputEvent"], eventLogger);

const setup = new DefaultGameSetup();
const [size, startPoint, endPoint] = [setup.getSize(), setup.getStartPoint(), setup.getEndPoint()];

const initialGameSetupData = {size, startPoint, endPoint};
const initialSetupEvent = new InitialSetupEvent(initialGameSetupData);
let gameState = initialSetupEvent.handle(usefulFunctions.makeNewGameState());

const boardDiv = document.getElementById("board")!;
boardDiv.innerHTML = `<pre>${gameState.board.boardAsString()}</pre>`;

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
        console.log("loggedEvents", window.loggedEvents);
        console.log("");
        boardDiv.innerHTML = `<pre>${gameState.board.boardAsString()}</pre>`;
    }
});
