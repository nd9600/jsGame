import * as R from "ramda";

import usefulFunctions from "@/core/usefulFunctions";
import { IError } from "@/core/myTypes";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import GameState from "@/core/GameState";
import Event from "@/core/events/Event";

export default class FailedMovementEvent extends MovementEvent {

    public readonly type = "FailedMovementEvent";
    public readonly data: IError;

    constructor(error: IError) {
        super();
        this.types = R.append(this.type, this.types);
        this.data = error;
        Event.dispatch(this.types, this.type, this.data);
    }

public handle(state: GameState): GameState {
    usefulFunctions.errorHandler(this.data);
    return super.handle(state);
}
}
