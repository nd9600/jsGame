<template>
    <div>hello</div>
</template>

<script lang="ts">
import Vue from "vue";
import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import GameStateFactory from "@/core/factories/GameStateFactory";
import DefaultGameSetup from "@/shell/DefaultGameSetup";
import EventBus from "@/shell/EventBus";
import UserInput from "@/shell/interaction/UserInput";
import * as R from "ramda";

const setup = new DefaultGameSetup();
const [initialPlayerName, size, startPoint, endPoint, playerIDs, boardIDs] = [setup.getInitialPlayerName(), setup.getSize(), setup.getStartPoint(), setup.getEndPoint(), setup.getPlayerIDs(), setup.getBoardIDs()];

const initialGameSetupData = {initialPlayerName, size, startPoint, endPoint, playerIDs, boardIDs};
const initialSetupEvent = new InitialSetupEvent(initialGameSetupData);
const initialGameState = initialSetupEvent.handle(GameStateFactory.createGameState());

const player = R.values(initialGameState.players)[0];

// UserInput.handleUserInput(initialGameState, player);

export default Vue.extend({
    name: "game"
});
</script>