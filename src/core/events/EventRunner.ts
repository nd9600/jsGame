import { DispatchedEvent } from "@/core/@typings/EventTypes";
import CommandEvent from "@/core/events/Command/CommandEvent";
import DirectionEvent from "@/core/events/Command/DirectionEvent";
import PlayerNameChangeEvent from "@/core/events/Command/PlayerNameChangeEvent";
import StatusChangeEvent from "@/core/events/Command/StatusChangeEvent";
import ToggleWallEvent from "@/core/events/Command/ToggleWallEvent";
import Event from "@/core/events/Event";
import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import InputEvent from "@/core/events/Game/InputEvent";
import FailedMovementEvent from "@/core/events/Movement/FailedMovementEvent";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import SuccessfulMovementEvent from "@/core/events/Movement/SuccessfulMovementEvent";
import GameStateFactory from "@/core/factories/GameStateFactory";
import GameState from "@/core/GameState";
import * as R from "ramda";

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
                    return new SuccessfulMovementEvent(dispatchedEvent.data);
                } case "CommandEvent": {
                    return new CommandEvent(dispatchedEvent.data);
                } case "DirectionEvent": {
                    return new DirectionEvent(dispatchedEvent.data);
                } case "PlayerNameChangeEvent": {
                    return new PlayerNameChangeEvent(dispatchedEvent.data);
                } case "StatusChangeEvent": {
                    return new StatusChangeEvent(dispatchedEvent.data);
                } case "ToggleWallEvent": {
                    return new ToggleWallEvent(dispatchedEvent.data);
                } 
                // default: {
                //     return new Event(dispatchedEvent.data);
                // }
            }
        };
        return R.map(makeEventFromDispatchedEvent, listOfEventObjects);
    }

    public static runEvents = (listOfEvents: Event[], initialState: (GameState | undefined) = undefined): GameState => {
        initialState = initialState || GameStateFactory.createGameState();
        const finalState = R.reduce(EventRunner.handleEvent, initialState, listOfEvents);
        return finalState;
    }
}
