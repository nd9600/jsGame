import usefulFunctions from "@/core/usefulFunctions";
import { GameState, IError } from "@/core/myTypes";
import MovementEvent from "@/core/events/MovementEvent";

export default class FailedMovementEvent extends MovementEvent {

    public data: IError;
    constructor(error: IError) {
        super();
        this.data = error;
    }

public handle(state: GameState): GameState {
    usefulFunctions.errorHandler(this.data);
    return super.handle(state);
}
}
