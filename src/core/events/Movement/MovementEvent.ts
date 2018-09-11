import { DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
import Event from "@/core/events/Event";
import * as R from "ramda";

export default class MovementEvent extends Event {
    public type: DispatchedEventNameTypes = "MovementEvent";

    constructor(data?: any) {
        super(data);
        this.types = R.append(this.type, this.types);
    }
}
