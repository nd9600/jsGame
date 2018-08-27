import { GameState } from "@/core/myTypes";

export default abstract class Event {
    public data: any;
    
    public handle(state: GameState): GameState {
        return state;
    }
}

