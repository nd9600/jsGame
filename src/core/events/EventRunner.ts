import Event from "@/core/events/Event";
import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import InputEvent from "@/core/events/Game/InputEvent";
import FailedMovementEvent from "@/core/events/Movement/FailedMovementEvent";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import SuccessfulMovementEvent from "@/core/events/Movement/SuccessfulMovementEvent";
import GameState from "@/core/GameState";
import { DispatchedEvent } from "@/core/myTypes";
import usefulFunctions from "@/core/usefulFunctions";
import * as R from "ramda";
import CommandEvent from "@/core/events/Command/CommandEvent";
import DirectionEvent from "@/core/events/Command/DirectionEvent";

export default class EventRunner {
    private static handleEvent = (gameState: GameState, event: Event): GameState => event.handle(gameState);

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
                } case "CommandEvent": {
                    return new CommandEvent(dispatchedEvent.data);
                } case "DirectionEvent": {
                    return new DirectionEvent(dispatchedEvent.data);
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
