import * as R from "ramda";
import Event from "@/core/events/Event";
import { Direction } from "@/core/myTypes";
import GameState from "@/core/GameState";
import movementFunctions from "@/core/board/movement";
import CommandEvent from "@/core/events/Command/CommandEvent";

export default class DirectionEvent extends CommandEvent {
    public type = "DirectionEvent";
    public data: Direction;

    constructor(direction: Direction) {
        super(direction);
        this.types = R.append(this.type, this.types);
        this.data = direction;
        Event.dispatch(this.types, this.type, this.data);
    }

    public handle(gameState: GameState): GameState {
        const movementEvent = movementFunctions.getPositionToMoveInto(gameState, this.data);
        return movementEvent.handle(gameState);
    }
}