import * as R from "ramda";
import { Direction } from "@/core/myTypes";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import movementFunctions from "@/core/board/movement";

export default class InputEvent extends Event {
    public type = "InputEvent";
    public data: Direction;

    constructor(direction: Direction) {
        super();
        this.types = R.append(this.type, this.types);
        this.data = direction;
        Event.dispatch(this.type, this.data);
    }

    public handle(gameState: GameState) {
        const direction = this.data;
        const movementEvent = movementFunctions.getPositionToMoveInto(gameState, direction);
        return movementEvent.handle(gameState);
    }
}
