import CommandEvent from "@/core/events/Command/CommandEvent";
import DirectionEvent from "@/core/events/Command/DirectionEvent";
import PlayerNameChangeEvent from "@/core/events/Command/PlayerNameChangeEvent";
import StatusChangeEvent from "@/core/events/Command/StatusChangeEvent";
import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import InputEvent from "@/core/events/Game/InputEvent";
import FailedMovementEvent from "@/core/events/Movement/FailedMovementEvent";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import SuccessfulMovementEvent from "@/core/events/Movement/SuccessfulMovementEvent";
import usefulFunctions from "@/core/usefulFunctions";
import * as R from "ramda";
import ToggleWallEvent from "@/core/events/Command/ToggleWallEvent";
export default class EventRunner {
}
EventRunner.handleEvent = (gameState, event) => event.handle(gameState);
EventRunner.makeListOfEvents = (listOfEventObjects) => {
    const makeEventFromDispatchedEvent = (dispatchedEvent) => {
        switch (dispatchedEvent.type) {
            case "InitialSetupEvent": {
                return new InitialSetupEvent(dispatchedEvent.data);
            }
            case "InputEvent": {
                return new InputEvent(dispatchedEvent.data);
            }
            case "FailedMovementEvent": {
                return new FailedMovementEvent(dispatchedEvent.data);
            }
            case "MovementEvent": {
                return new MovementEvent(dispatchedEvent.data);
            }
            case "SuccessfulMovementEvent": {
                return new SuccessfulMovementEvent(dispatchedEvent.data);
            }
            case "CommandEvent": {
                return new CommandEvent(dispatchedEvent.data);
            }
            case "DirectionEvent": {
                return new DirectionEvent(dispatchedEvent.data);
            }
            case "PlayerNameChangeEvent": {
                return new PlayerNameChangeEvent(dispatchedEvent.data);
            }
            case "StatusChangeEvent": {
                return new StatusChangeEvent(dispatchedEvent.data);
            }
            case "ToggleWallEvent": {
                return new ToggleWallEvent(dispatchedEvent.data);
            }
            // default: {
            //     return new Event(dispatchedEvent.data);
            // }
        }
    };
    return R.map(makeEventFromDispatchedEvent, listOfEventObjects);
};
EventRunner.runEvents = (listOfEvents, initialState = undefined) => {
    initialState = initialState || usefulFunctions.makeNewGameState();
    const finalState = R.reduce(EventRunner.handleEvent, initialState, listOfEvents);
    return finalState;
};
//# sourceMappingURL=EventRunner.js.map