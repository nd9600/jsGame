import Event from "@/core/events/Event";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import GameState from "@/core/GameState";
import { DispatchedEventNameTypes, Place, SuccessfulMovementEventData } from "@/core/myTypes";
import * as R from "ramda";

export default class SuccessfulMovementEvent extends MovementEvent {
    public type: DispatchedEventNameTypes = "SuccessfulMovementEvent";
    public data: SuccessfulMovementEventData;
    
    constructor(successfulMovementEventData: SuccessfulMovementEventData) {
        super();
        this.types = R.append(this.type, this.types);
        this.data = successfulMovementEventData;
        Event.dispatch(this.types, this.type, this.data);
    }

    public handle(gameState: GameState) {
        const newBoard = gameState.boards[this.data.boardID]
            .setPosition(gameState.boards[this.data.boardID].characterPosition, Place.Empty)
            .setPosition(this.data.newCharacterPosition, Place.Character)
            .setCharacterPosition(this.data.newCharacterPosition);

        return gameState.replaceBoard(newBoard);
    }
}
