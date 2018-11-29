import { EndPointChangeEventData } from "@/core/@typings/EventDataTypes";
import { DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
import BoardBuilder from "@/core/board/BoardBuilder";
import CommandEvent from "@/core/events/Command/CommandEvent";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import * as R from "ramda";

export default class EndPointChangeEvent extends CommandEvent {
    public type: DispatchedEventNameTypes = "EndPointChangeEvent";
    public data: EndPointChangeEventData;

    constructor(endPointChangeEventData: EndPointChangeEventData) {
        super(endPointChangeEventData);
        this.types = R.append(this.type, this.types);
        this.data = endPointChangeEventData;
        Event.dispatch(this.types, this.type, this.data);
    }

    public handle(gameState: GameState): GameState {
        const oldBoard = gameState.boards[this.data.boardID];
        const newBoard = BoardBuilder.mergeWithOptions(oldBoard, {endPoint: this.data.newEndPoint});
        return gameState.replaceBoard(newBoard);
    }
}
