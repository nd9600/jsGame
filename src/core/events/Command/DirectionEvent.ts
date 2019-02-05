import { Status } from "@/core/@typings/BoardTypes";
import { DirectionEventData } from "@/core/@typings/EventDataTypes";
import { DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
import movementFunctions from "@/core/board/movement";
import CommandEvent from "@/core/events/Command/CommandEvent";
import EventRunner from "@/core/events/EventRunner";
import GameState from "@/core/GameState";
import * as R from "ramda";

export default class DirectionEvent extends CommandEvent {
    public type: DispatchedEventNameTypes = "DirectionEvent";
    public data: DirectionEventData;

    constructor(data: DirectionEventData) {
        super(data);
        this.types = R.append(this.type, this.types);
        this.data = data;
    }

    /**
     * getPositionToMoveInto() returns multiple events, so we need to run them with the EventRunner here
     * @param gameState 
     */
    public handle(gameState: GameState): GameState {
        if (gameState.status !== Status.Playing) {
            return gameState;
        }

        const movementEvents = movementFunctions.getPositionToMoveInto(gameState, this.data.player, this.data.direction);
        return EventRunner.runEvents(movementEvents, gameState);
    }
}
