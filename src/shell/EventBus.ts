import { DispatchedEvent, EventCallback, DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
import Event from "@/core/events/Event.ts";
import * as R from "ramda";

export default class EventBus {
    private listeners: { 
        [key: string]: EventCallback[] 
    } = {
        default: [
            (dispatchedEvent: DispatchedEvent) => { 
                return;
             }
        ]
    };

    public addListener(eventName: DispatchedEventNameTypes, callback: EventCallback): void {
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
    public removeListener(event: DispatchedEventNameTypes, callback: EventCallback): void {
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

    private dispatch(eventType: DispatchedEventNameTypes, dispatchedEvent: DispatchedEvent): void {
        if (R.has(eventType, this.listeners)) {
            const eventsListOfListeners: EventCallback[] = this.listeners[eventType];
            const callListener = (listener: EventCallback) => {
                listener(dispatchedEvent);
            };
            R.forEach(callListener, eventsListOfListeners);
        }
    }

    //////////
    // other functions that are just useful to have
    //////////

    public getListeners() {
        return this.listeners;
    }

    public dispatchToAllListeners(event: Event): void {
        const originalEventType = event.type;
        
        // we need to cast originalEventType to the any-type so TS doesn't complain
        R.forEach(
            (type: DispatchedEventNameTypes) => {
                this.dispatch(type, {type: originalEventType as any, data: event.data});
            },
        event.types);
    }

    public addListenerToMultipleEvents(eventNames: DispatchedEventNameTypes[], callback: EventCallback): void {
        const addIndividualListener = (eventName: DispatchedEventNameTypes) => {
            this.addListener(eventName, callback);
        };
        R.forEach(addIndividualListener, eventNames);
    }
}
