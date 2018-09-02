import * as R from "ramda";
import { Command, Direction } from "@/core/myTypes";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import movementFunctions from "@/core/board/movement";

export default class InputEvent extends Event {
    public type = "InputEvent";
    public data: Command;

    constructor(command: Command) {
        super();
        this.types = R.append(this.type, this.types);
        this.data = command;
        Event.dispatch(this.types, this.type, this.data);
    }

    public handle(gameState: GameState) {
        const command = this.data;
        let event: Event;
        switch (command) {
            case (Command.MoveUp): {
                event = movementFunctions.getPositionToMoveInto(gameState, Direction.Up);
                break;
            }
            case (Command.MoveDown): {
                event = movementFunctions.getPositionToMoveInto(gameState, Direction.Down);
                break;
            }
            case (Command.MoveLeft): {
                event = movementFunctions.getPositionToMoveInto(gameState, Direction.Left);
                break;
            }
            case (Command.MoveRight): {
                event = movementFunctions.getPositionToMoveInto(gameState, Direction.Right);
                break;
            } default: {
                event = new Event();
            }
        }
        return event.handle(gameState);
    }
}
