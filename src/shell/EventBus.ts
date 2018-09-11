import { DispatchedEvent, DispatchedEventNameTypes, EventCallback } from "@/core/@typings/EventTypes";
import * as R from "ramda";

declare global {
    interface Window { 
        eventBus: EventBus; 
        loggedEvents: DispatchedEvent[];
    }
}

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

    private dispatch(event: string, dispatchedEvent: DispatchedEvent): void {
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

    //////////
    // other functions that are just useful to have
    //////////

    public getListeners() {
        return this.listeners;
    }

    public getUncaughtEvents() {
        return this.unCaughtEvents;
    }

    public dispatchToAllListeners(types: string[], originalEventType: DispatchedEventNameTypes, data?: any): void {
        if (window.eventBus) {
            // we need to cast originalEventType to the any-type so TS doesn't complain
            R.forEach(
                (type: string) => {
                    this.dispatch(type, {type: originalEventType as any, data});
                },
            types);
        }
    }

    public addListenerToMultipleEvents(eventNames: string[], callback: EventCallback): void {
        const addIndividualListener = (eventName: string) => {
            this.addListener(eventName, callback);
        };
        R.forEach(addIndividualListener, eventNames);
    }
}
