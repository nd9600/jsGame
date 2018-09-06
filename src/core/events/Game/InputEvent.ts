import * as R from "ramda";
import { Command, Direction } from "@/core/myTypes";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import DirectionEvent from "@/core/events/Command/DirectionEvent";

export default class InputEvent extends Event {
    public readonly type = "InputEvent";
    public readonly data: Command;

    constructor(command: Command) {
        super();
        this.types = R.append(this.type, this.types);
        this.data = command;
        Event.dispatch(this.types, this.type, this.data);
    }

    public createEvent(): Event {
        switch (this.data) {
            case (Command.MoveUp): {
                return new DirectionEvent(Direction.Up);
            }
            case (Command.MoveDown): {
                return new DirectionEvent(Direction.Down);
            }
            case (Command.MoveLeft): {
                return new DirectionEvent(Direction.Left);
            }
            case (Command.MoveRight): {
                return new DirectionEvent(Direction.Right);
            }
            default: {
                return new Event();
            }
        }
    }

    public handle(gameState: GameState) {
        const event = this.createEvent();
        return event.handle(gameState);
    }
}
