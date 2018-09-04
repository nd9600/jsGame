import Board from "@/core/board/Board";
import boardFunctions from "@/core/board/boardFunctions";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import { InitialGameSetupData } from "@/core/myTypes";
import * as R from "ramda";
import usefulFunctions from "@/core/usefulFunctions";

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
        const boards = usefulFunctions.makeBoards([initialBoard]);
        return new GameState(boards);
    }
}
