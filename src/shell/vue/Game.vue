<template>
    <div class="m-8">
        <div class="font-serif text-2xl font-bold">My game</div>
         <div class="flex items-start m-8">
            <div class="bg-grey-lighter border border-grey m-4 p-4">
                <p class="whitespace-pre-line font-sans text-left ">{{ gameState.getCurrentInfo() }}</p>
            </div>
            <div class="flex flex-col border border-grey mt-4 ml-4 p-4">
                <span>Change name</span>
                <input 
                    class="border border-grey-dark my-2 p-2"
                    type="text"
                    placeholder="new name"
                    v-model="newPlayerName"
                    @keydown.enter="changePlayerName"
                >
                <button
                    class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                    type="submit" 
                    @click="changePlayerName"
                >
                    Change name
                </button>

                <div class="h-1 w-full border-t border-grey-light my-2 "></div>
            </div>
         </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as R from "ramda";

import { InputEventData, Command } from "@/core/@typings/EventDataTypes";
import { DispatchedEvent, EventCallback } from "@/core/@typings/EventTypes";
import PlayerNameChangeEvent from "@/core/events/Command/PlayerNameChangeEvent";
import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import InputEvent from "@/core/events/Game/InputEvent";

import Board from "@/core/board/Board";
import GameState from "@/core/GameState";
import GameStateFactory from "@/core/factories/GameStateFactory";
import Player from "@/core/player/Player";
import DefaultGameSetup from "@/shell/DefaultGameSetup";
import EventBus from "@/shell/EventBus";

import "@/assets/css/game.css";

export default Vue.extend({
    name: "game",
    data(): {
        gameState: GameState | null;
        playerID: number | null;

        newPlayerName: string
    } {
        return {
            gameState: null,
            playerID: null,
            
            newPlayerName: ""
        };
    },
    watch: {
        playerID() {
            this.newPlayerName = this.player.name;
        }
    },
    computed: {
        player(): Player {
            return this.gameState!.players[this.playerID!];
        },
        ownedBoardID(): number {
            return R.find(R.propEq("creatorID", this.playerID), R.values(this.gameState!.boards))!.id;
        },
        ownedBoard(): Board {
            return this.gameState!.boards[this.ownedBoardID];
        }
    },
    created() {
        window.eventBus = new EventBus();
        window.loggedEvents  = [];
        const eventLogger: EventCallback = (dispatchedEvent: DispatchedEvent): void => {
            window.loggedEvents.push(dispatchedEvent);
            console.log(`${dispatchedEvent.type}: `, dispatchedEvent.data );
        };
        window.eventBus.addListenerToMultipleEvents(["InitialSetupEvent", "InputEvent"], eventLogger);

        const setup = new DefaultGameSetup();
        const [initialPlayerName, size, startPoint, endPoint, playerIDs, boardIDs] = [setup.getInitialPlayerName(), setup.getSize(), setup.getStartPoint(), setup.getEndPoint(), setup.getPlayerIDs(), setup.getBoardIDs()];

        const initialGameSetupData = {initialPlayerName, size, startPoint, endPoint, playerIDs, boardIDs};
        const initialSetupEvent = new InitialSetupEvent(initialGameSetupData);
        this.gameState = initialSetupEvent.handle(GameStateFactory.createGameState());
        this.playerID = R.values(this.gameState.players)[0].id;
        
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

            window.addEventListener("keydown", (event) => {
                if (! R.contains(event.code, R.keys(KEYS_TO_COMMANDS))) {
                    return;
                }
                event.preventDefault();

                const gameState = vm.gameState!;
                const player = gameState.players[this.playerID!];

                if (KEYS_TO_COMMANDS.hasOwnProperty(event.code)) {
                    const inputEventData: InputEventData = {
                        command: KEYS_TO_COMMANDS[event.code],
                        player
                    };

                    const inputEvent = new InputEvent(inputEventData);
                    this.gameState = inputEvent.handle(gameState);
                    console.log("gameState: ", gameState);
                }
            });
        },

        changePlayerName(): void {
            const playerNameChangeEvent = new PlayerNameChangeEvent({playerID: this.playerID!, newPlayerName: this.newPlayerName});
            this.gameState = playerNameChangeEvent.handle(this.gameState!);
        }
    }
});
</script>
