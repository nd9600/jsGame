import * as R from "ramda";
import Event from "@/core/events/Event";

export default class CommandEvent extends Event {
    public readonly type = "CommandEvent";

    constructor(data?: any) {
        super(data);
        this.types = R.append(this.type, this.types);
    }
}
