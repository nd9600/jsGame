/**
 * Only the subclasses that aren't extended dispatch to the EventBus - e.g. SuccessfulMovementEvents do, MovementEvents don't, and Events don't
 */
export default class Event {
    constructor(data) {
        this.type = "Event";
        this.types = [this.type];
        this.data = data;
    }
    handle(gameState) {
        return gameState;
    }
    static dispatch(types, originalEventType, data) {
        if (window.eventBus) {
            window.eventBus.dispatchToAllListeners(types, originalEventType, data);
        }
    }
}
//# sourceMappingURL=Event.js.map