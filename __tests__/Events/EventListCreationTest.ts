import { Status } from "@/core/@typings/BoardTypes";
import { Command, Direction } from "@/core/@typings/EventDataTypes";
import { DispatchedEvent } from "@/core/@typings/EventTypes";
import DirectionEvent from "@/core/events/Command/DirectionEvent";
import EndPointChangeEvent from "@/core/events/Command/EndPointChangeEvent";
import PlayerNameChangeEvent from "@/core/events/Command/PlayerNameChangeEvent";
import SetPlayerBoardStatusToFinishedEvent from "@/core/events/Command/SetPlayerBoardStatusToFinishedEvent";
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
        const player0 = GameStateFactory.defaultPlayer();
        const player1 = GameStateFactory.defaultPlayer();
        const board0 = GameStateFactory.defaultBoard();
        const board1 = GameStateFactory.defaultBoard();

        const listOfEventObjects: DispatchedEvent[] = [
            { type: "InitialSetupEvent", data: {initialPlayerName: "x", size: [4, 4], startPoint: { x: 0, y: 0 }, endPoint: { x: 3, y: 3 }, playerIDs: [player0.id, player1.id], boardIDs: [board0.id, board1.id]} },
            { type: "InputEvent", data: {command: Command.MoveDown, player: player0}},
            { type: "FailedMovementEvent", data: {name: "error", message: "msg"} },
            { type: "MovementEvent" },
            { type: "SuccessfulMovementEvent", data: {boardID: board0.id, playerID: player0.id, newCharacterPosition: {x: 0, y: 0}} },
            { type: "DirectionEvent", data: {direction: Direction.Down, player: player0} },
            { type: "PlayerNameChangeEvent", data: {playerID: player0.id, newPlayerName: "x"} },
            { type: "StatusChangeEvent", data: {boardID: board0.id, newStatus: Status.Finished} },
            { type: "SetPlayerBoardStatusToFinishedEvent", data: {playerID: player0.id, boardID: board0.id} },
            { type: "StartPointChangeEvent", data: {boardID: board0.id, newStartPoint: {x: 0, y: 0}} },
            { type: "EndPointChangeEvent", data: {boardID: board0.id, newEndPoint: {x: 0, y: 0}} },
            { type: "ToggleWallEvent", data: {boardID: board0.id, positionToToggle: {x: 0, y: 0}} },
        ];
        const expectedListOfEvents: object[] = [
            new InitialSetupEvent({initialPlayerName: "x", size: [4, 4], startPoint: { x: 0, y: 0 }, endPoint: { x: 3, y: 3 }, playerIDs: [player0.id, player1.id], boardIDs: [board0.id, board1.id]}),
            new InputEvent({command: Command.MoveDown, player: player0}),
            new FailedMovementEvent({ name: "error", message: "msg" }),
            new MovementEvent(),
            new SuccessfulMovementEvent({boardID: board0.id, playerID: player0.id, newCharacterPosition: {x: 0, y: 0}}),
            new DirectionEvent({direction: Direction.Down, player: player0}),
            new PlayerNameChangeEvent({playerID: player0.id, newPlayerName: "x"}),
            new StatusChangeEvent({boardID: board0.id, newStatus: Status.Finished}),
            new SetPlayerBoardStatusToFinishedEvent({playerID: player0.id, boardID: board0.id}),
            new StartPointChangeEvent({boardID: board0.id, newStartPoint: {x: 0, y: 0}}),
            new EndPointChangeEvent({boardID: board0.id, newEndPoint: {x: 0, y: 0}}),
            new ToggleWallEvent({boardID: board0.id, positionToToggle: {x: 0, y: 0}}),
        ];

        const listOfEvents = EventRunner.makeListOfEvents(listOfEventObjects);
        expect(listOfEvents).toEqual(expectedListOfEvents);
    });
});
