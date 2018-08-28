import { Direction } from "@/core/myTypes";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import movementFunctions from "@/core/board/movement";

export default class InputEvent extends Event {

    public type = "InputEvent";
    public data: Direction;

    constructor(direction: Direction) {
        super();
        this.data = direction;
    }

    public handle(gameState: GameState) {
        const direction = this.data;
        const movementEvent = movementFunctions.getPositionToMoveInto(gameState, direction);
        return movementEvent.handle(gameState);
    }
}
