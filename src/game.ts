import { DispatchedEvent, EventCallback } from "@/core/@typings/EventTypes";
import EventBus from "@/shell/EventBus";
import Game from "./shell/vue/Game.vue";
import Vue from "vue";

window.eventBus = new EventBus();
window.loggedEvents  = [];
const eventLogger: EventCallback = (dispatchedEvent: DispatchedEvent): void => {
    window.loggedEvents.push(dispatchedEvent);
    console.log("event, data: ", dispatchedEvent.data);
};
window.eventBus.addListenerToMultipleEvents(["InitialSetupEvent", "InputEvent"], eventLogger);

const game = new Vue({
    el: "#app",
    template: "<game />",
    components: {
        Game
    }
});
