import * as R from "ramda";
import GameState from "@/core/GameState";

export default abstract class Event {
    public type = "Event";
    public types: string[] = [this.type];
    public data: any;

    public handle(state: GameState): GameState {
        return state;
    }

    public static dispatch(types: string[], originalEventType: string, data?: any): void {
        if (window.eventBus) {
            window.eventBus.dispatchToAllListeners(types, originalEventType, data);
        }
    }
}
