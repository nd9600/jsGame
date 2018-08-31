import * as R from "ramda";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import usefulFunctions from "@/core/usefulFunctions";
import { DispatchedEvent } from "@/core/myTypes";
import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import InputEvent from "@/core/events/Game/InputEvent";
import FailedMovementEvent from "@/core/events/Movement/FailedMovementEvent";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import SuccessfulMovementEvent from "@/core/events/Movement/SuccessfulMovementEvent";

export default class EventRunner {
    private static handleEvent = (state: GameState, event: Event): GameState => event.handle(state);

    public static makeListOfEvents = (listOfEventObjects: DispatchedEvent[]): Event[] => {
        const makeEventFromDispatchedEvent = (dispatchedEvent: DispatchedEvent): Event => {
            switch (dispatchedEvent.type) {
                case "InitialSetupEvent": {
                    return new InitialSetupEvent(dispatchedEvent.data);
                } case "InputEvent": {
                    return new InputEvent(dispatchedEvent.data);
                } case "FailedMovementEvent": {
                    return new FailedMovementEvent(dispatchedEvent.data);
                } case "MovementEvent": {
                    return new MovementEvent(dispatchedEvent.data);
                } case "SuccessfulMovementEvent": {
                    return new SuccessfulMovementEvent(dispatchedEvent.data.boardID, dispatchedEvent.data.newCharacterPosition);
                } default: {
                    return new Event(dispatchedEvent.data);
                }
            }
        };
        return R.map(makeEventFromDispatchedEvent, listOfEventObjects);
    }

    public static runEvents = (listOfEvents: Event[], initialState: (GameState | undefined) = undefined): GameState => {
        initialState = initialState || usefulFunctions.makeNewGameState();
        const finalState = R.reduce(EventRunner.handleEvent, initialState, listOfEvents);
        return finalState;
    }
}
