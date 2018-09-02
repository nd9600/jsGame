import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import { DispatchedEvent, EventCallback } from "@/core/myTypes";
import usefulFunctions from "@/core/usefulFunctions";
import DefaultGameSetup from "@/shell/DefaultGameSetup";
import EventBus from "@/shell/EventBus";
import UserInput from "@/shell/interaction/UserInput";

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
const initialGameState = initialSetupEvent.handle(usefulFunctions.makeNewGameState());

UserInput.handleUserInput(initialGameState);
