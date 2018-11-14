import Event from "@/core/events/Event";
import * as R from "ramda";
export default class MovementEvent extends Event {
    constructor(data) {
        super(data);
        this.type = "MovementEvent";
        this.types = R.append(this.type, this.types);
    }
}
//# sourceMappingURL=MovementEvent.js.map