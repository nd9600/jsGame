import GameState from "@/core/GameState";

export default abstract class Event {
    public type = "Event";
    public data: any;

    public handle(state: GameState): GameState {
        return state;
    }

    public static dispatch(type: string, data?: any): void {
        if (window.eventBus) {
            if (data !== undefined) {
                window.eventBus.dispatch(type, {type, data});
            } else {
                window.eventBus.dispatch(type, {type});
            }
        }
    }
}
