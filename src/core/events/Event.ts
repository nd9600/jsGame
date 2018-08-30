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
            if (data !== undefined) {
                R.forEach(
                    (type: string) => {
                        window.eventBus.dispatch(type, {type: originalEventType, data});
                    },
                types);
            } else {
                R.forEach(
                    (type: string) => {
                        window.eventBus.dispatch(type, {type: originalEventType});
                    },
                types);
            }
        }
    }
}
