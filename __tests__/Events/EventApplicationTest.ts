import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import usefulFunctions from "@/core/usefulFunctions";
import { Position, twoNumbers, Place, DispatchedEvent, Command } from "@/core/myTypes";
import TestSetup from "@/shell/TestSetup";
import EventRunner from "@/core/events/EventRunner";
import Board from "@/core/board/Board";
import GameState from "@/core/GameState";

describe("EventApplication", () => {
    let size: twoNumbers;
    let startPoint: Position;
    let endPoint: Position;
    beforeEach(() => {
        const setup = new TestSetup();
        [size, startPoint, endPoint] = [
            setup.getSize(),
            setup.getStartPoint(),
            setup.getEndPoint()
        ];
    });

    it("creates_initial_game", () => {
        const initialGameSetupData = { size, startPoint, endPoint };
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
        expect(gameState.board.getBoard()).toEqual(wantedBoard);
    });

    it("applies_a_list_of_events", () => {
        const listOfEventObjects: DispatchedEvent[] = [
            {
                type: "InitialSetupEvent",
                data: {
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
        // expect(finalState.board.boardSolved).toEqual(true);
        expect(finalState.board.getBoard()).toEqual(wantedBoard);
    });

    it("applies_a_list_of_events_with_an_initial_state", () => {
        const initialBoardData = [
            [Place.Character, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.Empty],
            [Place.Empty, Place.Empty, Place.Empty, Place.End]
        ];
        const initialBoard = new Board(
            Board.idCounter++, 
            initialBoardData, 
            { x: 0, y: 0 }, 
            { x: 3, y: 3 }
        );
        const initialState = new GameState(initialBoard);
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
        // expect(finalState.board.boardSolved).toEqual(true);
        expect(finalState.board.getBoard()).toEqual(wantedBoard);
    });
});
