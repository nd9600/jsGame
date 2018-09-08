import movementFunctions from "@/core/board/movement";
import CommandEvent from "@/core/events/Command/CommandEvent";
import Event from "@/core/events/Event";
import EventRunner from "@/core/events/EventRunner";
import GameState from "@/core/GameState";
import { Direction, DispatchedEventNameTypes } from "@/core/myTypes";
import * as R from "ramda";

export default class DirectionEvent extends CommandEvent {
    public type: DispatchedEventNameTypes = "DirectionEvent";
    public data: Direction;

    constructor(direction: Direction) {
        super(direction);
        this.types = R.append(this.type, this.types);
        this.data = direction;
        Event.dispatch(this.types, this.type, this.data);
    }

    /**
     * getPositionToMoveInto() returns multiple events, so we need to run them with the EventRunner here
     * @param gameState 
     */
    public handle(gameState: GameState): GameState {
        const movementEvents = movementFunctions.getPositionToMoveInto(gameState, this.data);
        return EventRunner.runEvents(movementEvents, gameState);
    }
}
