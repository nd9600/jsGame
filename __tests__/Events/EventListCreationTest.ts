import EventRunner from "@/core/events/EventRunner";
import { Command, DispatchedEvent, Direction, Status } from "@/core/myTypes";
import Event from "@/core/events/Event";
import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import InputEvent from "@/core/events/Game/InputEvent";
import FailedMovementEvent from "@/core/events/Movement/FailedMovementEvent";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import SuccessfulMovementEvent from "@/core/events/Movement/SuccessfulMovementEvent";
import CommandEvent from "@/core/events/Command/CommandEvent";
import DirectionEvent from "@/core/events/Command/DirectionEvent";
import StatusChangeEvent from "@/core/events/Command/StatusChangeEvent";
import PlayerNameChangeEvent from "@/core/events/Command/PlayerNameChangeEvent";

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
            new InitialSetupEvent({initialPlayerName: "x", size: [4, 4], startPoint: { x: 0, y: 0 }, endPoint: { x: 3, y: 3 }}),
            new InputEvent(Command.MoveDown),
            new FailedMovementEvent({ name: "error", message: "msg" }),
            new MovementEvent(),
            new SuccessfulMovementEvent({boardID: 0, newCharacterPosition: {x: 0, y: 0}}),
            new CommandEvent(Command.MoveDown),
            new DirectionEvent(Direction.Down),
            new PlayerNameChangeEvent({boardID: 0, newPlayerName: "x"}),
            new StatusChangeEvent({boardID: 0, newStatus: Status.Finished}),
            new Event(),
        ];

        const listOfEvents = EventRunner.makeListOfEvents(listOfEventObjects);
        expect(listOfEvents).toEqual(expectedListOfEvents);
    });
});
