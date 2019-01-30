import { Status } from "@/core/@typings/BoardTypes";
import { EndPointChangeEventData } from "@/core/@typings/EventDataTypes";
import { DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
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
    }

    public handle(gameState: GameState): GameState {
        if (gameState.status !== Status.NotStarted) {
            return gameState;
        }

        const oldBoard = gameState.boards[this.data.boardID];
        if (R.equals(this.data.newEndPoint, oldBoard.startPoint)) {
            return gameState;
        }

        const newBoard = oldBoard.setEndPoint(this.data.newEndPoint);
        return gameState
            .replaceBoard(newBoard);
    }
}
