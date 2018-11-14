import * as R from "ramda";
export default class EventBus {
    constructor() {
        this.unCaughtEvents = [];
        this.listeners = {
            default: [
                (dispatchedEvent) => {
                    this.unCaughtEvents = R.append(dispatchedEvent, this.unCaughtEvents);
                }
            ]
        };
    }
    addListener(eventName, callback) {
        let newListOfListeners;
        if (R.has(eventName, this.listeners)) {
            const eventsListOfListeners = this.listeners[eventName];
            newListOfListeners = R.append(callback, eventsListOfListeners);
        }
        else {
            newListOfListeners = [callback];
        }
        this.listeners = R.assoc(eventName, newListOfListeners, this.listeners);
    }
    /**
     * Removes a specific listener from an event. We need to call callback.toString() to check if two different functions are equal, because checking R.equal(function1, function2) didn't work for some reason
     * @param event the name of the event
     * @param callback the callback function to remove
     */
    removeListener(event, callback) {
        let newListOfListeners;
        if (R.has(event, this.listeners)) {
            const eventsListOfListeners = this.listeners[event];
            newListOfListeners = R.reject(R.complement(R.equals(callback.toString())), eventsListOfListeners);
        }
        else {
            newListOfListeners = [];
        }
        this.listeners = R.assoc(event, newListOfListeners, this.listeners);
    }
    dispatch(event, dispatchedEvent) {
        if (R.has(event, this.listeners)) {
            const eventsListOfListeners = this.listeners[event];
            const callListener = (listener) => {
                listener(dispatchedEvent);
            };
            R.forEach(callListener, eventsListOfListeners);
        }
        else {
            this.unCaughtEvents = R.append(dispatchedEvent, this.unCaughtEvents);
        }
    }
    //////////
    // other functions that are just useful to have
    //////////
    getListeners() {
        return this.listeners;
    }
    getUncaughtEvents() {
        return this.unCaughtEvents;
    }
    dispatchToAllListeners(types, originalEventType, data) {
        if (window.eventBus) {
            // we need to cast originalEventType to the any-type so TS doesn't complain
            R.forEach((type) => {
                this.dispatch(type, { type: originalEventType, data });
            }, types);
        }
    }
    addListenerToMultipleEvents(eventNames, callback) {
        const addIndividualListener = (eventName) => {
            this.addListener(eventName, callback);
        };
        R.forEach(addIndividualListener, eventNames);
    }
}
//# sourceMappingURL=EventBus.js.map