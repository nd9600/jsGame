import * as R from "ramda";
import Event from "@/core/events/Event";
import GameState from "@/core/GameState";
import { Position, twoNumbers } from "@/core/myTypes";
import boardFunctions from "@/core/board/boardFunctions";
import Board from "@/core/board/Board";

export default class EventRunner {
    private static handleEvent = (state: GameState, event: Event): GameState => event.handle(state);

    public static runEvents = (size: twoNumbers, startPoint: Position, endPoint: Position, listOfEvents: Event[]) => {
        const initialBoardData = boardFunctions.makeInitialBoard(size, startPoint, endPoint);
        const initialBoard = new Board(
            Board.idCounter++, 
            initialBoardData, 
            startPoint, 
            endPoint
        );
        const initialState = new GameState(initialBoard);
        const finalState = R.reduce(EventRunner.handleEvent, initialState, listOfEvents);
        return finalState;
    }
}
