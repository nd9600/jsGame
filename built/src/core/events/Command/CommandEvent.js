import Event from "@/core/events/Event";
import * as R from "ramda";
export default class CommandEvent extends Event {
    constructor(data) {
        super(data);
        this.type = "CommandEvent";
        this.types = R.append(this.type, this.types);
    }
}
//# sourceMappingURL=CommandEvent.js.map