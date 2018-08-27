import { Direction } from "@/core/myTypes";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import boardFunctions from "@/core/board/boardFunctions";

export default class InputEvent extends Event {

    public type = "InputEvent";
    public data: Direction;

    constructor(direction: Direction) {
        super();
        this.data = direction;
    }

    public handle(gameState: GameState) {
        const direction = this.data;
        return boardFunctions.move(gameState, direction);
    }
}
