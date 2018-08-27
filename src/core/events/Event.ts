import GameState from "@/core/GameState";

export default abstract class Event {
    public type = "Event";
    public data: any;
    
    public handle(state: GameState): GameState {
        return state;
    }
}

