import GameState from "@/core/GameState";
import { DispatchedEventNameTypes } from "@/core/myTypes";

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

    public static dispatch(types: string[], originalEventType: DispatchedEventNameTypes, data?: any): void {
        if (window.eventBus) {
            window.eventBus.dispatchToAllListeners(types, originalEventType, data);
        }
    }
}
