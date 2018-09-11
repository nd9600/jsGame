import { InitialGameSetupData, Command, SuccessfulMovementEventData, Direction, PlayerNameChangeEventData, StatusChangeEventData, ToggleWallEventData } from "@/core/@typings/EventDataTypes";

import { IError } from "@/core/@typings/GeneralTypes";

interface DispatchedGeneralEvent {
    type: "Event";
    data?: any;
}

interface DispatchedInitialSetupEvent {
    type: "InitialSetupEvent";
    data: InitialGameSetupData;
}

interface DispatchedInputEvent {
    type: "InputEvent";
    data: Command;
}

interface DispatchedFailedMovementEvent {
    type: "FailedMovementEvent";
    data: IError;
}

interface DispatchedMovementEvent {
    type: "MovementEvent";
    data?: any;
}

interface DispatchedSuccessfulMovementEventEvent {
    type: "SuccessfulMovementEvent";
    data: SuccessfulMovementEventData;
}

interface DispatchedCommandEvent {
    type: "CommandEvent";
    data?: any;
}

interface DispatchedDirectionEvent {
    type: "DirectionEvent";
    data: Direction;
}

interface DispatchedPlayerNameChangeEvent {
    type: "PlayerNameChangeEvent";
    data: PlayerNameChangeEventData;
}

interface DispatchedStatusChangeEvent {
    type: "StatusChangeEvent";
    data: StatusChangeEventData;
}

interface DispatchedToggleWallEvent {
    type: "ToggleWallEvent";
    data: ToggleWallEventData;
}

type DispatchedEvent = DispatchedGeneralEvent | DispatchedInitialSetupEvent | DispatchedInputEvent | DispatchedFailedMovementEvent | DispatchedMovementEvent | DispatchedSuccessfulMovementEventEvent | DispatchedCommandEvent | DispatchedDirectionEvent | DispatchedPlayerNameChangeEvent | DispatchedStatusChangeEvent | DispatchedToggleWallEvent;

type DispatchedEventNameTypes = DispatchedEvent["type"];
type DispatchedEventDataTypes = DispatchedEvent["data"];

type EventCallback = (dispatchedEvent: DispatchedEvent) => void;

export { DispatchedEvent, DispatchedEventNameTypes, DispatchedEventDataTypes, EventCallback };
