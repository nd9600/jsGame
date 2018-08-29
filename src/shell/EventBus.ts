import * as R from "ramda";

export default class EventBus {
    private listeners: { 
        [key: string]: Array<(data?: any) => void> 
    } = {};

    public addListener(event: string, callback: (data?: any) => void): void {
        let newListOfListeners: Array<(data?: any) => void>;
        if (R.has(event, this.listeners)) {
            const eventsListOfListeners: Array<(data?: any) => void> = this.listeners[event];
            newListOfListeners = R.append(callback, eventsListOfListeners);
        } else {
            newListOfListeners = [callback];
        }
        this.listeners = R.assoc(event, newListOfListeners, this.listeners);
    }

    /**
     * Removes a specific listener from an event. We need to call callback.toString() to check if two different functions are equal, because checking R.equal(function1, function2) didn't work for some reason
     * @param event the name of the event
     * @param callback the callback function to remove
     */
    public removeListener(event: string, callback: (data?: any) => void): void {
        let newListOfListeners: Array<() => void>;
        if (R.has(event, this.listeners)) {
            const eventsListOfListeners: Array<(data?: any) => void> = this.listeners[event];
            newListOfListeners = R.reject(
                R.complement(R.equals(callback.toString())), 
                eventsListOfListeners
            );
        } else {
            newListOfListeners = [];
        }
        this.listeners = R.assoc(event, newListOfListeners, this.listeners);
    }

    public dispatch(event: string, data?: any): void {
        const eventsListOfListeners: Array<(data?: any) => void> = this.listeners[event];
        const callListener = (listener: (data?: any) => void) => {
            listener(data);
        };
        R.forEach(callListener, eventsListOfListeners);
    }

    public getListeners() {
        return this.listeners;
    }
}
