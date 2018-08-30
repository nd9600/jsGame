import usefulFunctions from "@/core/usefulFunctions";
import { IError } from "@/core/myTypes";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import GameState from "@/core/GameState";
import Event from "@/core/events/Event";

export default class FailedMovementEvent extends MovementEvent {

    public type = "FailedMovementEvent";
    public data: IError;

    constructor(error: IError) {
        super();
        this.data = error;
        // Event.dispatch(this.type, this.data);
    }

public handle(state: GameState): GameState {
    usefulFunctions.errorHandler(this.data);
    return super.handle(state);
}
}
