<template>
    <div class="m-8">
        <!-- <div class="font-serif text-2xl font-bold">My game</div> -->
         <div class="flex items-start">
            <player-display
                id="playerDisplay"
                class="w-3/4"
                tabindex="-1"
                :game-state="gameState"
                :player_id="playerID"
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
import ToggleWallEvent from "@/core/events/Command/ToggleWallEvent";
import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import InputEvent from "@/core/events/Game/InputEvent";

import Board from "@/core/board/Board";
import GameState from "@/core/GameState";
import GameStateFactory from "@/core/factories/GameStateFactory";
import Player from "@/core/player/Player";
import DefaultGameSetup from "@/shell/DefaultGameSetup";
import EventBus from "@/shell/EventBus";

import GameStatus from "@components/GameStatus.vue";
import PlayerDisplay from "@components/PlayerDisplay.vue";
import "@/assets/css/game.css";

export default Vue.extend({
    name: "game",
    components: {
        GameStatus,
        PlayerDisplay
    },
    data(): {
        gameState: GameState | null;
        playerID: number | null;

        newPlayerName: string,
        newStartPoint: string,
        newEndPoint: string,
    } {
        return {
            gameState: null,
            playerID: null,
            
            newPlayerName: "",
            newStartPoint: "",
            newEndPoint: ""
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
        },
        canChangeStartOrEndPoint(): boolean {
            return this.gameState!.status === Status.NotStarted;
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

        this.newStartPoint = JSON.stringify(this.ownedBoard.startPoint);
        this.newEndPoint = JSON.stringify(this.ownedBoard.endPoint);
    },
    mounted() {
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

            const playerDisplay = document.getElementById("playerDisplay")!;
            playerDisplay.addEventListener("keydown", (event) => {
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
        },

        changeStartPoint(): void {
            const newStartPoint: BoardPosition = JSON.parse(this.newStartPoint);
            const startPointChangeEvent = new StartPointChangeEvent({boardID: this.ownedBoardID, newStartPoint});
            this.gameState = startPointChangeEvent.handle(this.gameState!);
        },

        changeEndPoint(): void {
            const newEndPoint: BoardPosition = JSON.parse(this.newEndPoint);
            const endPointChangeEvent = new EndPointChangeEvent({boardID: this.ownedBoardID, newEndPoint});
            this.gameState = endPointChangeEvent.handle(this.gameState!);
        },

        toggleWall(boardID: number, positionToToggle: BoardPosition): void {
            const toggleWallEvent = new ToggleWallEvent({boardID, positionToToggle});
            this.gameState = toggleWallEvent.handle(this.gameState!);
        }
    }
});
</script>
