import * as R from "ramda";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import { BoardType, InitialGameSetupData } from "@/core/myTypes";
import boardFunctions from "@/core/board/boardFunctions";
import Board from "@/core/board/Board";

export default class InitialSetupEvent extends Event {
    public type = "InitialSetupEvent";
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
            initialBoardData, 
            this.data.startPoint, 
            this.data.endPoint
        );
        return new GameState(initialBoard);
    }
}
