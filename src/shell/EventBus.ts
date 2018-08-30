import * as R from "ramda";
import { DispatchedEvent, EventCallback } from "@/core/myTypes";

export default class EventBus {
    private unCaughtEvents: DispatchedEvent[] = [];

    private listeners: { 
        [key: string]: EventCallback[] 
    } = {
        default: [
            (dispatchedEvent: DispatchedEvent) => { 
                this.unCaughtEvents = R.append(dispatchedEvent, this.unCaughtEvents);
             }
        ]
    };

    public addListener(eventName: string, callback: EventCallback): void {
        let newListOfListeners: EventCallback[];
        if (R.has(eventName, this.listeners)) {
            const eventsListOfListeners: EventCallback[] = this.listeners[eventName];
            newListOfListeners = R.append(callback, eventsListOfListeners);
        } else {
            newListOfListeners = [callback];
        }
        this.listeners = R.assoc(eventName, newListOfListeners, this.listeners);
    }

    /**
     * Removes a specific listener from an event. We need to call callback.toString() to check if two different functions are equal, because checking R.equal(function1, function2) didn't work for some reason
     * @param event the name of the event
     * @param callback the callback function to remove
     */
    public removeListener(event: string, callback: EventCallback): void {
        let newListOfListeners: EventCallback[];
        if (R.has(event, this.listeners)) {
            const eventsListOfListeners: EventCallback[] = this.listeners[event];
            newListOfListeners = R.reject(
                R.complement(R.equals(callback.toString())), 
                eventsListOfListeners
            );
        } else {
            newListOfListeners = [];
        }
        this.listeners = R.assoc(event, newListOfListeners, this.listeners);
    }

    public dispatch(event: string, dispatchedEvent: DispatchedEvent): void {
        if (R.has(event, this.listeners)) {
            const eventsListOfListeners: EventCallback[] = this.listeners[event];
            const callListener = (listener: EventCallback) => {
                listener(dispatchedEvent);
            };
            R.forEach(callListener, eventsListOfListeners);
        } else {
            this.unCaughtEvents = R.append(dispatchedEvent, this.unCaughtEvents);
        }
    }

    public getListeners() {
        return this.listeners;
    }

    public getUncaughtEvents() {
        return this.unCaughtEvents;
    }
}
