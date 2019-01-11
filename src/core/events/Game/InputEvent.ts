import { Command, Direction, InputEventData } from "@/core/@typings/EventDataTypes";
import { DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
import DirectionEvent from "@/core/events/Command/DirectionEvent";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import * as R from "ramda";

export default class InputEvent extends Event {
    public type: DispatchedEventNameTypes = "InputEvent";
    public data: InputEventData;

    constructor(data: InputEventData) {
        super();
        this.types = R.append(this.type, this.types);
        this.data = data;
    }

    public createEvent(): Event {
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

    public handle(gameState: GameState) {
        const event = this.createEvent();
        return event.handle(gameState);
    }
}
