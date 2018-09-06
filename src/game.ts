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
const [initialPlayerName, size, startPoint, endPoint] = [setup.getInitialPlayerName(), setup.getSize(), setup.getStartPoint(), setup.getEndPoint()];

const initialGameSetupData = {initialPlayerName, size, startPoint, endPoint};
const initialSetupEvent = new InitialSetupEvent(initialGameSetupData);
const initialGameState = initialSetupEvent.handle(usefulFunctions.makeNewGameState());
// console.log(initialGameState.boards);
// console.log(R.values(initialGameState.boards));
// console.log(R.values(initialGameState.boards)[0]);
UserInput.handleUserInput(initialGameState);
