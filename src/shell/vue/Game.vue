<template>
    <div>
        hello

        <div class="whitespace-pre-line">
            {{ gameState.getCurrentInfo() }}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as R from "ramda";
import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import GameState from "@/core/GameState";
import GameStateFactory from "@/core/factories/GameStateFactory";
import Player from "@/core/player/Player";
import { InputEventData, Command } from "@/core/@typings/EventDataTypes";
import InputEvent from "@/core/events/Game/InputEvent";
import DefaultGameSetup from "@/shell/DefaultGameSetup";
import EventBus from "@/shell/EventBus";

import "@/assets/css/game.css";

export default Vue.extend({
    name: "game",
    data(): {
        gameState: GameState | null;
        player: Player | null;
    } {
        return {
            gameState: null,
            player: null
        };
    },
    watch: {

    },
    created() {
        const setup = new DefaultGameSetup();
        const [initialPlayerName, size, startPoint, endPoint, playerIDs, boardIDs] = [setup.getInitialPlayerName(), setup.getSize(), setup.getStartPoint(), setup.getEndPoint(), setup.getPlayerIDs(), setup.getBoardIDs()];

        const initialGameSetupData = {initialPlayerName, size, startPoint, endPoint, playerIDs, boardIDs};
        const initialSetupEvent = new InitialSetupEvent(initialGameSetupData);
        this.gameState = initialSetupEvent.handle(GameStateFactory.createGameState());
        this.player = R.values(this.gameState.players)[0];

        this.registerCommandListeners();
    },
    methods: {
        registerCommandListeners() {
            const vm = this;
            const KEYS_TO_COMMANDS: { [index: string]: Command } = {
                ArrowUp: Command.MoveUp,
                ArrowDown: Command.MoveDown,
                ArrowLeft: Command.MoveLeft,
                ArrowRight: Command.MoveRight
            };

            const gameState = vm.gameState!;
            const player = vm.player!;

            window.addEventListener("keyup", ({code}) => {
            if (KEYS_TO_COMMANDS.hasOwnProperty(code)) {
                const inputEventData: InputEventData = {
                    command: KEYS_TO_COMMANDS[code],
                    player
                };

                const inputEvent = new InputEvent(inputEventData);
                this.gameState = inputEvent.handle(gameState);
                console.log("gameState: ", gameState);
            }
        });
        }
    }
});
</script>