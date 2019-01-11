import { DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
import GameState from "@/core/GameState";

/**
 * Only the subclasses that aren't extended dispatch to the EventBus - e.g. SuccessfulMovementEvents do, MovementEvents don't, and Events don't
 */
export default class Event {
    public type: DispatchedEventNameTypes = "Event";
    public types: DispatchedEventNameTypes[] = [this.type];
    public data?: any;

    constructor(data?: any) {
        this.data = data;
    }

    public handle(gameState: GameState): GameState {
        return gameState;
    }
}
