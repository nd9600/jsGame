<template>
    <div class="m-8">
        <!-- <div class="font-serif text-2xl font-bold">My game</div> -->
        <div class="flex items-start">
            <player-display
                id="playerDisplay"
                class="w-3/4"
                tabindex="-1"
                :game-state="gameState"
                :player_id="playerId"
            />
            <div class="flex flex-col w-1/4 border border-grey mt-4 ml-4 p-4">
                <game-status :game-state="gameState"/>

                <div class="h-1 w-full border-t border-grey-light my-2"></div>

                <div class="flex flex-col">
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
                </div>

                <template v-if="canChangeStartOrEndPoint">
                    <div class="h-1 w-full border-t border-grey-light my-2"></div>

                    <div class="flex flex-col">
                        <span>Change start point</span>
                        <input 
                            class="border border-grey-dark my-2 p-2"
                            type="text"
                            placeholder="new start point"
                            v-model="newStartPoint"
                            @keydown.enter="changeStartPoint"
                        >
                        <button
                            class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                            type="submit" 
                            @click="changeStartPoint"
                        >
                            Change start point
                        </button>
                    </div>
                </template>

                <template v-if="canChangeStartOrEndPoint">
                    <div class="h-1 w-full border-t border-grey-light my-2"></div>

                    <div class="flex flex-col">
                        <span>Change end point</span>
                        <input 
                            class="border border-grey-dark my-2 p-2"
                            type="text"
                            placeholder="new end point"
                            v-model="newEndPoint"
                            @keydown.enter="changeEndPoint"
                        >
                        <button
                            class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                            type="submit" 
                            @click="changeEndPoint"
                        >
                            Change end point
                        </button>
                    </div>
                </template>
                
                <template
                    v-if="this.ownedBoard.status === 'NotStarted'"
                >
                    <div class="h-1 w-full border-t border-grey-light my-2"></div>

                    <div class="flex flex-col">
                        <span class="mb-2">Start making the maze</span>
                        <button
                            class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                            type="submit" 
                            @click="changeBoardStatus('PlacingWalls')"
                        >
                            (by adding walls)
                        </button>
                    </div>
                </template>
                
                <template
                    v-if="this.ownedBoard.status === 'PlacingWalls'"
                >
                    <div class="h-1 w-full border-t border-grey-light my-2"></div>

                    <div class="flex flex-col">
                        <span class="mb-2">Start playing</span>
                        <button
                            class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                            type="submit" 
                            @click="changeBoardStatus('Playing')"
                        >
                            (by completing the mazes)
                        </button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as R from "ramda";

import { BoardPosition, Status } from "@/core/@typings/BoardTypes";
import { InputEventData, Command } from "@/core/@typings/EventDataTypes";
import { DispatchedEvent, EventCallback } from "@/core/@typings/EventTypes";
import EndPointChangeEvent from "@/core/events/Command/EndPointChangeEvent";
import PlayerNameChangeEvent from "@/core/events/Command/PlayerNameChangeEvent";
import StartPointChangeEvent from "@/core/events/Command/StartPointChangeEvent";
import StatusChangeEvent from "@/core/events/Command/StatusChangeEvent";
import InputEvent from "@/core/events/Game/InputEvent";

import Board from "@/core/board/Board";
import GameState from "@/core/GameState";
import Player from "@/core/player/Player";
import EventBus from "@/shell/EventBus";
import { GameStoredInFirebase } from "@/shell/firebase/FirebaseTypes";

import GameStatus from "@components/GameStatus.vue";
import PlayerDisplay from "@components/PlayerDisplay.vue";
import "@/assets/css/game.css";

export default Vue.extend({
    name: "game",
    inject: ["eventBus"],
    components: {
        GameStatus,
        PlayerDisplay
    },

    props: {
        playerId: {
            type: Number,
            required: true
        },
        gameState: {
            type: GameState,
            required: true
        },

        gameToImport: {
            type: Object, // GameStoredInFirebase
            required: true
        },


    },

    data(): {
        newPlayerName: string;
        newStartPoint: string;
        newEndPoint: string;
    } {
        return {            
            newPlayerName: "",
            newStartPoint: "",
            newEndPoint: ""
        };
    },

    watch: {
        playerId: {
            immediate: true,
            handler() {
                this.newPlayerName = this.player.name;
            }
        }
    },

    computed: {
        player(): Player {
            return this.gameState!.players[this.playerId!];
        },
        ownedBoardID(): number {
            return R.find(R.propEq("creatorID", this.playerId), R.values(this.gameState!.boards))!.id;
        },
        ownedBoard(): Board {
            return this.gameState!.boards[this.ownedBoardID];
        },
        canChangeStartOrEndPoint(): boolean {
            return this.gameState!.status === Status.NotStarted;
        }
    },

    mounted() {
        this.registerCommandListeners();
    },

    methods: {
        registerCommandListeners(): void {
            const vm = this;
            const KEYS_TO_COMMANDS: { [index: string]: Command } = {
                ArrowUp: Command.MoveUp,
                ArrowDown: Command.MoveDown,
                ArrowLeft: Command.MoveLeft,
                ArrowRight: Command.MoveRight
            };

            const playerDisplay = document.getElementById("playerDisplay")!;
            playerDisplay.addEventListener("keydown", (event) => {
                console.log(KEYS_TO_COMMANDS);
                console.log(event);
                if (! R.contains(event.code, R.keys(KEYS_TO_COMMANDS))) {
                    return;
                }
                event.preventDefault();

                const gameState = vm.gameState!;
                const player = gameState.players[this.playerId!];

                if (KEYS_TO_COMMANDS.hasOwnProperty(event.code)) {
                    const inputEventData: InputEventData = {
                        command: KEYS_TO_COMMANDS[event.code],
                        player
                    };

                    const inputEvent = new InputEvent(inputEventData);
                    this.eventBus.dispatchToAllListeners(inputEvent);
                    console.log("inputEvent: ", inputEvent);
                    console.log("gameState: ", gameState);
                }
            });
        },

        changePlayerName(): void {
            const playerNameChangeEvent = new PlayerNameChangeEvent({playerID: this.playerId!, newPlayerName: this.newPlayerName});
            this.eventBus.dispatchToAllListeners(playerNameChangeEvent);
        },

        changeStartPoint(): void {
            const newStartPoint: BoardPosition = JSON.parse(this.newStartPoint);
            const startPointChangeEvent = new StartPointChangeEvent({boardID: this.ownedBoardID, newStartPoint});
            this.eventBus.dispatchToAllListeners(startPointChangeEvent);
        },

        changeEndPoint(): void {
            const newEndPoint: BoardPosition = JSON.parse(this.newEndPoint);
            const endPointChangeEvent = new EndPointChangeEvent({boardID: this.ownedBoardID, newEndPoint});
            this.eventBus.dispatchToAllListeners(endPointChangeEvent);
        },
        
        changeBoardStatus(newStatus: Status): void {
            const statusChangeEvent = new StatusChangeEvent({boardID: this.ownedBoardID, newStatus});
            this.eventBus.dispatchToAllListeners(statusChangeEvent);
        },
    }
});
</script>
