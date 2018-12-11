import { DirectionEventData, EndPointChangeEventData, InitialGameSetupData, InputEventData, PlayerNameChangeEventData, SetPlayerBoardStatusToFinishedEventData, StartPointChangeEventData, StatusChangeEventData, SuccessfulMovementEventData, ToggleWallEventData } from "@/core/@typings/EventDataTypes";
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
    data: InputEventData;
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
    data?: InputEventData | DirectionEventData | PlayerNameChangeEventData | StatusChangeEventData | StartPointChangeEventData | EndPointChangeEventData | ToggleWallEventData;
}

interface DispatchedDirectionEvent {
    type: "DirectionEvent";
    data: DirectionEventData;
}

interface DispatchedPlayerNameChangeEvent {
    type: "PlayerNameChangeEvent";
    data: PlayerNameChangeEventData;
}

interface DispatchedStatusChangeEvent {
    type: "StatusChangeEvent";
    data: StatusChangeEventData;
}

interface DispatchedSetPlayerBoardStatusToFinishedEvent {
    type: "SetPlayerBoardStatusToFinishedEvent";
    data: SetPlayerBoardStatusToFinishedEventData;
}

interface DispatchedStartPointChangeEvent {
    type: "StartPointChangeEvent";
    data: StartPointChangeEventData;
}

interface DispatchedEndPointChangeEvent {
    type: "EndPointChangeEvent";
    data: EndPointChangeEventData;
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
    | DispatchedSetPlayerBoardStatusToFinishedEvent
    | DispatchedStartPointChangeEvent
    | DispatchedEndPointChangeEvent
    | DispatchedToggleWallEvent;

type DispatchedEventNameTypes = DispatchedGeneralEvent["type"] 
    | DispatchedEvent["type"];
type DispatchedEventDataTypes = DispatchedGeneralEvent["data"] 
    | DispatchedEvent["data"];

type EventCallback = (dispatchedEvent: DispatchedEvent) => void;

export { DispatchedEvent, DispatchedEventNameTypes, DispatchedEventDataTypes, EventCallback };

