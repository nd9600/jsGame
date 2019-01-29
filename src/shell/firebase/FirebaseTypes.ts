import GameState from "@/core/GameState";
import { DispatchedEvent } from "@/core/@typings/EventTypes";

interface ElementStoredInFirebase {
    initialGameState: GameState;
    events: DispatchedEvent[] | string; // string if array is empty, since firebase doesn't store empty arrays
}

interface ElementToStoreInFirebase {
    initialGameState: GameState;
    events: DispatchedEvent[];
}

export { ElementStoredInFirebase, ElementToStoreInFirebase }