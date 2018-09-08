import * as R from "ramda";
import Event from "@/core/events/Event";
import { DispatchedEventNameTypes } from "@/core/myTypes";

export default class CommandEvent extends Event {
    
    public type: DispatchedEventNameTypes = "CommandEvent";

    constructor(data?: any) {
        super(data);
        this.types = R.append(this.type, this.types);
    }
}
