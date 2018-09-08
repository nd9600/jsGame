import Board from "@/core/board/Board";
import EventRunner from "@/core/events/EventRunner";
import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import GameState from "@/core/GameState";
import { Command, DispatchedEvent, Place, Position, twoNumbers } from "@/core/myTypes";
import usefulFunctions from "@/core/usefulFunctions";
import TestSetup from "@/shell/TestSetup";
import * as R from "ramda";

describe("EventApplication", () => {
    let size: twoNumbers;
    let startPoint: Position;
    let endPoint: Position;
    let initialPlayerName: string;
    beforeEach(() => {
        const setup = new TestSetup();
        [initialPlayerName, size, startPoint, endPoint] = [
            setup.getInitialPlayerName(),
            setup.getSize(),
            setup.getStartPoint(),
            setup.getEndPoint()
        ];
    });

    it("creates_initial_game", () => {
        const initialGameSetupData = { initialPlayerName, size, startPoint, endPoint };
        const initialSetupEvent = new InitialSetupEvent(initialGameSetupData);
        const gameState = initialSetupEvent.handle(
            usefulFunctions.makeNewGameState()
        );
        const wantedBoard = [
            [Place.Character, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.End]
        ];
        
        const board = R.values(gameState.boards)[0];
        expect(board.boardData).toEqual(wantedBoard);
    });

    it("applies_a_list_of_events", () => {
        const listOfEventObjects: DispatchedEvent[] = [
            {
                type: "InitialSetupEvent",
                data: {
                    initialPlayerName: "x",
                    size: [4, 4],
                    startPoint: { x: 0, y: 0 },
                    endPoint: { x: 3, y: 3 }
                }
            },
            { type: "InputEvent", data: Command.MoveDown },
            { type: "InputEvent", data: Command.MoveRight }
        ];

        const listOfEvents = EventRunner.makeListOfEvents(listOfEventObjects);
        const finalState = EventRunner.runEvents(listOfEvents);
        const wantedBoard = [
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Character]
        ];
        const finalBoard = R.values(finalState.boards)[0];
        expect(finalBoard.boardSolved).toEqual(true);
        expect(finalBoard.boardData).toEqual(wantedBoard);
    });

    it("applies_a_list_of_events_with_an_initial_gameState", () => {
        const initialBoardData = [
            [Place.Character, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.End]
        ];
        const initialBoard = new Board(
            Board.idCounter++, 
            "",
            initialBoardData, 
            { x: 0, y: 0 }, 
            { x: 3, y: 3 }
        );
        const initialState = new GameState(usefulFunctions.makeBoardsObject([initialBoard]));
        const listOfEventObjects: DispatchedEvent[] = [
            { type: "InputEvent", data: Command.MoveDown },
            { type: "InputEvent", data: Command.MoveRight }
        ];

        const listOfEvents = EventRunner.makeListOfEvents(listOfEventObjects);
        const finalState = EventRunner.runEvents(listOfEvents, initialState);
        const wantedBoard = [
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Character]
        ];
        const finalBoard = R.values(finalState.boards)[0];
        expect(finalBoard.boardSolved).toEqual(true);
        expect(finalBoard.boardData).toEqual(wantedBoard);
    });
});
