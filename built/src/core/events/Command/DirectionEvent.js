import movementFunctions from "@/core/board/movement";
import CommandEvent from "@/core/events/Command/CommandEvent";
import Event from "@/core/events/Event";
import EventRunner from "@/core/events/EventRunner";
import * as R from "ramda";
export default class DirectionEvent extends CommandEvent {
    constructor(data) {
        super(data);
        this.type = "DirectionEvent";
        this.types = R.append(this.type, this.types);
        this.data = data;
        Event.dispatch(this.types, this.type, this.data);
    }
    /**
     * getPositionToMoveInto() returns multiple events, so we need to run them with the EventRunner here
     * @param gameState
     */
    handle(gameState) {
        const movementEvents = movementFunctions.getPositionToMoveInto(gameState, this.data.player, this.data.direction);
        return EventRunner.runEvents(movementEvents, gameState);
    }
}
//# sourceMappingURL=DirectionEvent.js.map