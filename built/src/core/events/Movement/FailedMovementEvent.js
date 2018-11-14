import Event from "@/core/events/Event";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import usefulFunctions from "@/core/usefulFunctions";
import * as R from "ramda";
export default class FailedMovementEvent extends MovementEvent {
    constructor(error) {
        super();
        this.type = "FailedMovementEvent";
        this.types = R.append(this.type, this.types);
        this.data = error;
        Event.dispatch(this.types, this.type, this.data);
    }
    handle(gameState) {
        usefulFunctions.errorHandler(this.data);
        return super.handle(gameState);
    }
}
//# sourceMappingURL=FailedMovementEvent.js.map