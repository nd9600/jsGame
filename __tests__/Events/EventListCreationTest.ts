import EventRunner from "@/core/events/EventRunner";
import { Command, DispatchedEvent, Direction, Status } from "@/core/myTypes";
import Event from "@/core/events/Event";

describe("EventApplication", () => {

    it("applies_a_list_of_events", () => {
        const listOfEventObjects: DispatchedEvent[] = [
            { type: "InitialSetupEvent", data: {initialPlayerName: "x", size: [4, 4], startPoint: { x: 0, y: 0 }, endPoint: { x: 3, y: 3 }} },
            { type: "InputEvent", data: Command.MoveDown },
            { type: "FailedMovementEvent", data: {name: "error", message: "msg"} },
            { type: "MovementEvent" },
            { type: "SuccessfulMovementEvent", data: {boardID: 0, newCharacterPosition: {x: 0, y: 0}} },
            { type: "CommandEvent", data: Command.MoveDown },
            { type: "DirectionEvent", data: Direction.Down },
            { type: "PlayerNameChangeEvent", data: {boardID: 0, newPlayerName: "x"} },
            { type: "StatusChangeEvent", data: {boardID: 0, newStatus: Status.Finished} },
            { type: "Event" },
        ];
        const expectedListOfEvents: object[] = [
            {
                type: "InitialSetupEvent",
                types: [ "Event", "InitialSetupEvent" ],
                data:
                    { 
                        initialPlayerName: "x",
                        size: [Array],
                        startPoint: [Object],
                        endPoint: [Object] 
                    } 
            },
            {
                type: "InputEvent",
                types: [ "Event", "InputEvent" ],
                data: "MoveDown" },
            {
                type: "FailedMovementEvent",
                types: [ "Event", "MovementEvent", "FailedMovementEvent" ],
                data: { name: "error", message: "msg" } },
            {
                type: "MovementEvent",
                types: [ "Event", "MovementEvent" ],
                data: undefined },
            {
                type: "SuccessfulMovementEvent",
                types: [ "Event", "MovementEvent", "SuccessfulMovementEvent" ],
                data: { boardID: 0, newCharacterPosition: [Object] } },
            {
                type: "CommandEvent",
                types: [ "Event", "CommandEvent" ],
                data: "MoveDown" },
            {
                type: "DirectionEvent",
                types: [ "Event", "CommandEvent", "DirectionEvent" ],
                data: "Down" 
            }
        ];

        const listOfEvents = EventRunner.makeListOfEvents(listOfEventObjects);
        expect(listOfEvents).toEqual(expectedListOfEvents);
        console.log(listOfEvents);
    });
});
