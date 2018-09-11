import { InitialGameSetupData } from "@/core/@typings/EventDataTypes";
import { DispatchedEventNameTypes } from "@/core/@typings/EventTypes";
import Board from "@/core/board/Board";
import boardFunctions from "@/core/board/boardFunctions";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import usefulFunctions from "@/core/usefulFunctions";
import * as R from "ramda";

export default class InitialSetupEvent extends Event {
    public type: DispatchedEventNameTypes = "InitialSetupEvent";
    public data: InitialGameSetupData;

    constructor(initialGameSetupData: InitialGameSetupData) {
        super();
        this.types = R.append(this.type, this.types);
        this.data = initialGameSetupData;
        Event.dispatch(this.types, this.type, this.data);
    }

    public handle(gameState: GameState): GameState {
        const initialBoardData = boardFunctions.makeInitialBoard(this.data.size, this.data.startPoint, this.data.endPoint);
        const initialBoard = new Board(
            Board.idCounter++,
            this.data.initialPlayerName, 
            initialBoardData, 
            this.data.startPoint, 
            this.data.endPoint
        );
        const boards = usefulFunctions.makeBoardsObject([initialBoard]);
        return new GameState(boards);
    }
}
