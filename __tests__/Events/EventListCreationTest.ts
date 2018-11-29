import { Status } from "@/core/@typings/BoardTypes";
import { Command, Direction } from "@/core/@typings/EventDataTypes";
import { DispatchedEvent } from "@/core/@typings/EventTypes";
import DirectionEvent from "@/core/events/Command/DirectionEvent";
import EndPointChangeEvent from "@/core/events/Command/EndPointChangeEvent";
import PlayerNameChangeEvent from "@/core/events/Command/PlayerNameChangeEvent";
import StartPointChangeEvent from "@/core/events/Command/StartPointChangeEvent";
import StatusChangeEvent from "@/core/events/Command/StatusChangeEvent";
import ToggleWallEvent from "@/core/events/Command/ToggleWallEvent";
import EventRunner from "@/core/events/EventRunner";
import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import InputEvent from "@/core/events/Game/InputEvent";
import FailedMovementEvent from "@/core/events/Movement/FailedMovementEvent";
import MovementEvent from "@/core/events/Movement/MovementEvent";
import SuccessfulMovementEvent from "@/core/events/Movement/SuccessfulMovementEvent";
import GameStateFactory from "@/core/factories/GameStateFactory";

describe("EventApplication", () => {

    it("makes_a_list_of_events", () => {
        const listOfEventObjects: DispatchedEvent[] = [
            { type: "InitialSetupEvent", data: {initialPlayerName: "x", size: [4, 4], startPoint: { x: 0, y: 0 }, endPoint: { x: 3, y: 3 }} },
            { type: "InputEvent", data: {command: Command.MoveDown, player: GameStateFactory.defaultPlayer}},
            { type: "FailedMovementEvent", data: {name: "error", message: "msg"} },
            { type: "MovementEvent" },
            { type: "SuccessfulMovementEvent", data: {boardID: 0, playerID: 0, newCharacterPosition: {x: 0, y: 0}} },
            { type: "DirectionEvent", data: {direction: Direction.Down, player: GameStateFactory.defaultPlayer} },
            { type: "PlayerNameChangeEvent", data: {playerID: 0, newPlayerName: "x"} },
            { type: "StatusChangeEvent", data: {boardID: 0, newStatus: Status.Finished} },
            { type: "StartPointChangeEvent", data: {boardID: 0, newStartPoint: {x: 0, y: 0}} },
            { type: "EndPointChangeEvent", data: {boardID: 0, newEndPoint: {x: 0, y: 0}} },
            { type: "ToggleWallEvent", data: {boardID: 0, positionToToggle: {x: 0, y: 0}} },
        ];
        const expectedListOfEvents: object[] = [
            new InitialSetupEvent({initialPlayerName: "x", size: [4, 4], startPoint: { x: 0, y: 0 }, endPoint: { x: 3, y: 3 }}),
            new InputEvent({command: Command.MoveDown, player: GameStateFactory.defaultPlayer}),
            new FailedMovementEvent({ name: "error", message: "msg" }),
            new MovementEvent(),
            new SuccessfulMovementEvent({boardID: 0, playerID: 0, newCharacterPosition: {x: 0, y: 0}}),
            new DirectionEvent({direction: Direction.Down, player: GameStateFactory.defaultPlayer}),
            new PlayerNameChangeEvent({playerID: 0, newPlayerName: "x"}),
            new StatusChangeEvent({boardID: 0, newStatus: Status.Finished}),
            new StartPointChangeEvent({boardID: 0, newStartPoint: {x: 0, y: 0}}),
            new EndPointChangeEvent({boardID: 0, newEndPoint: {x: 0, y: 0}}),
            new ToggleWallEvent({boardID: 0, positionToToggle: {x: 0, y: 0}}),
        ];

        const listOfEvents = EventRunner.makeListOfEvents(listOfEventObjects);
        expect(listOfEvents).toEqual(expectedListOfEvents);
    });
});
