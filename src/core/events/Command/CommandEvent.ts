import { DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
import Event from "@/core/events/Event";
import * as R from "ramda";

export default class CommandEvent extends Event {
    
    public type: DispatchedEventNameTypes = "CommandEvent";

    constructor(data?: any) {
        super(data);
        this.types = R.append(this.type, this.types);
    }
}
