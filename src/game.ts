import { DispatchedEvent, EventCallback } from "@/core/@typings/EventTypes";
import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import GameStateFactory from "@/core/factories/GameStateFactory";
import DefaultGameSetup from "@/shell/DefaultGameSetup";
import EventBus from "@/shell/EventBus";
import UserInput from "@/shell/interaction/UserInput";
import * as R from "ramda";

window.eventBus = new EventBus();
window.loggedEvents  = [];
const eventLogger: EventCallback = (dispatchedEvent: DispatchedEvent): void => {
    window.loggedEvents.push(dispatchedEvent);
    console.log("event, data: ", dispatchedEvent.data);
};
window.eventBus.addListenerToMultipleEvents(["InitialSetupEvent", "InputEvent"], eventLogger);

const setup = new DefaultGameSetup();
const [initialPlayerName, size, startPoint, endPoint] = [setup.getInitialPlayerName(), setup.getSize(), setup.getStartPoint(), setup.getEndPoint()];

const initialGameSetupData = {initialPlayerName, size, startPoint, endPoint};
const initialSetupEvent = new InitialSetupEvent(initialGameSetupData);
const initialGameState = initialSetupEvent.handle(GameStateFactory.createGameState());

const player = R.values(initialGameState.players)[0];

UserInput.handleUserInput(initialGameState, player);
