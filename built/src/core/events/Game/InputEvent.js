import { Command, Direction } from "@/core/@typings/EventDataTypes";
import DirectionEvent from "@/core/events/Command/DirectionEvent";
import Event from "@/core/events/Event";
import * as R from "ramda";
export default class InputEvent extends Event {
    constructor(data) {
        super();
        this.type = "InputEvent";
        this.types = R.append(this.type, this.types);
        this.data = data;
        Event.dispatch(this.types, this.type, this.data);
    }
    createEvent() {
        switch (this.data.command) {
            case (Command.MoveUp): {
                const eventData = {
                    direction: Direction.Up,
                    player: this.data.player
                };
                return new DirectionEvent(eventData);
            }
            case (Command.MoveDown): {
                const eventData = {
                    direction: Direction.Down,
                    player: this.data.player
                };
                return new DirectionEvent(eventData);
            }
            case (Command.MoveLeft): {
                const eventData = {
                    direction: Direction.Left,
                    player: this.data.player
                };
                return new DirectionEvent(eventData);
            }
            case (Command.MoveRight): {
                const eventData = {
                    direction: Direction.Right,
                    player: this.data.player
                };
                return new DirectionEvent(eventData);
            }
            default: {
                return new Event();
            }
        }
    }
    handle(gameState) {
        const event = this.createEvent();
        return event.handle(gameState);
    }
}
//# sourceMappingURL=InputEvent.js.map