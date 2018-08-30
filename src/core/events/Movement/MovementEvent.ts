import * as R from "ramda";
import Event from "@/core/events/Event";

export default class MovementEvent extends Event {
    public type = "MovementEvent";

    constructor() {
        super();
        this.types = R.append(this.type, this.types);

        Event.dispatch(this.type);
    }
}
