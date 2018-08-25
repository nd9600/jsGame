import usefulFunctions from "@/game/usefulFunctions";
import { GameState, IError } from "@/game/myTypes";
import MovementEvent from "@/game/events/MovementEvent";

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
