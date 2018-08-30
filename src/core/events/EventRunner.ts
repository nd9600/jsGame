import * as R from "ramda";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import usefulFunctions from "@/core/usefulFunctions";
import { DispatchedEvent } from "@/core/myTypes";

export default class EventRunner {
    private static handleEvent = (state: GameState, event: Event): GameState => event.handle(state);

    public static makeListOfEvents = (listOfEventObjects: DispatchedEvent[]): Event[] => {
        const makeEventFromDispatchedEvent = (dispatchedEvent: DispatchedEvent): Event => {
            const event: Event = new (window as any)[dispatchedEvent.type](dispatchedEvent.data);
            return event;
        };
        return R.map(makeEventFromDispatchedEvent, listOfEventObjects);
    }

    public static runEvents = (listOfEvents: Event[]): GameState => {
        const initialState = usefulFunctions.makeNewGameState();
        const finalState = R.reduce(EventRunner.handleEvent, initialState, listOfEvents);
        return finalState;
    }
}
