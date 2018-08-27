import usefulFunctions from "@/core/usefulFunctions";
import { IError } from "@/core/myTypes";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import GameState from "@/core/GameState";

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
