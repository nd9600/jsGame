import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import usefulFunctions from "@/core/usefulFunctions";
import { Position, twoNumbers, Place, DispatchedEvent } from "@/core/myTypes";
import TestSetup from "@/shell/TestSetup";
import EventRunner from "@/core/events/EventRunner";

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
                    startPoint: {
                        x: 0,
                        y: 0
                    },
                    endPoint: {
                        x: 3,
                        y: 3
                    }
                }
            },
            {
                type: "InputEvent",
                data: 1
            },
            {
                type: "InputEvent",
                data: 3
            }
        ];

        const listOfEvents = EventRunner.makeListOfEvents(listOfEventObjects);
        const finalState = EventRunner.runEvents(listOfEvents);
        const wantedBoard = [
            [" ", " ", " ", " "],
            [" ", " ", " ", " "],
            [" ", " ", " ", " "],
            [" ", " ", " ", "c"]
        ];
        expect(finalState.board.boardSolved).toEqual(true);
        expect(finalState.board.getBoard()).toEqual(wantedBoard);
    });
});
