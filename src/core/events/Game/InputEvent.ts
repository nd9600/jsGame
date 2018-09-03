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

    public createEvent(command: Command, gameState: GameState): Event {
        switch (command) {
            case (Command.MoveUp): {
                return movementFunctions.getPositionToMoveInto(gameState, Direction.Up);
            }
            case (Command.MoveDown): {
                return movementFunctions.getPositionToMoveInto(gameState, Direction.Down);
            }
            case (Command.MoveLeft): {
                return movementFunctions.getPositionToMoveInto(gameState, Direction.Left);
            }
            case (Command.MoveRight): {
                return movementFunctions.getPositionToMoveInto(gameState, Direction.Right);
            }
            default: {
                return new Event();
            }
        }
    }

    public handle(gameState: GameState) {
        const command = this.data;
        const event = this.createEvent(command, gameState);
        return event.handle(gameState);
    }
}
