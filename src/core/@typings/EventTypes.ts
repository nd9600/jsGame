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

interface DispatchedMovementEvent {
    type: "MovementEvent";
    data?: IError | SuccessfulMovementEventData;
}

interface DispatchedFailedMovementEvent {
    type: "FailedMovementEvent";
    data: IError;
}

interface DispatchedSuccessfulMovementEventEvent {
    type: "SuccessfulMovementEvent";
    data: SuccessfulMovementEventData;
}

interface DispatchedCommandEvent {
    type: "CommandEvent";
    data?: Command | Direction | PlayerNameChangeEventData | StatusChangeEventData | ToggleWallEventData;
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

type DispatchedEvent = DispatchedInitialSetupEvent 
    | DispatchedInputEvent 
    | DispatchedFailedMovementEvent 
    | DispatchedMovementEvent 
    | DispatchedSuccessfulMovementEventEvent 
    | DispatchedCommandEvent 
    | DispatchedDirectionEvent 
    | DispatchedPlayerNameChangeEvent 
    | DispatchedStatusChangeEvent 
    | DispatchedToggleWallEvent;

type DispatchedEventNameTypes = DispatchedGeneralEvent["type"] 
    | DispatchedEvent["type"];
type DispatchedEventDataTypes = DispatchedGeneralEvent["data"] 
    | DispatchedEvent["data"];

type EventCallback = (dispatchedEvent: DispatchedEvent) => void;

export { DispatchedEvent, DispatchedEventNameTypes, DispatchedEventDataTypes, EventCallback };
