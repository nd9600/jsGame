import * as R from "ramda";
import Event from "@/core/events/Event";

export default class MovementEvent extends Event {
    public readonly type = "MovementEvent";

    constructor(data?: any) {
        super(data);
        this.types = R.append(this.type, this.types);
    }
}
