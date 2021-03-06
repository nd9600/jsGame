import { DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
import { IError } from "@/core/@typings/GeneralTypes";
import Event from "@/core/events/Event";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import GameState from "@/core/GameState";
import usefulFunctions from "@/core/usefulFunctions";
import * as R from "ramda";

export default class FailedMovementEvent extends MovementEvent {

    public type: DispatchedEventNameTypes = "FailedMovementEvent";
    public data: IError;

    constructor(error: IError) {
        super();
        this.types = R.append(this.type, this.types);
        this.data = error;
    }

public handle(gameState: GameState): GameState {
    usefulFunctions.errorHandler(this.data);
    return super.handle(gameState);
}
}
