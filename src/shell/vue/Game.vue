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

                <template>
                    <div class="h-1 w-full border-t border-grey-light my-2"></div>

                    <div class="flex flex-col">
                        <button
                            class="bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded"
                            type="submit" 
                            @click="saveGameToFirebase"
                        >
                            Save game
                        </button>

                        <div>
                            <input 
                                class="inline w-1/3 border border-r-0 border-grey-dark my-2 p-2"
                                type="text"
                                value="game ID: "
                                disabled="disabled"
                            ><input 
                                class="inline w-1/3 border border-grey-dark my-2 p-2"
                                type="text"
                                v-model="gameID"
                                @keydown.enter="loadGameFromFirebase"
                            >
                        </div>

                        <button
                            class="bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded"
                            type="submit" 
                            @click="loadGameFromFirebase"
                        >
                            Load game
                        </button>
                    </div>
                </template>
            </div>
        </div>
        <div class="flex flex-col">
            <div class="mb-2">
                <span class="text-sm text-grey-light">Game log</span>
                <p class="text-transparent hover:text-grey-light">
                    {{ gameToImport }}
                </p>
            </div>
            <div class="flex flex-col w-1/2">
                <span class="text-sm text-grey-light">Import game</span>  
                <input 
                    type="text"
                    class="border border-transparent hover:border-grey-light text-transparent hover:text-grey p-1"
                    placeholder="game JSON"
                    @keyup.enter.prevent="importGame"
                >
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
import BaseEvent from "core/events/Event";
import EventRunner from "@/core/events/EventRunner";
import EndPointChangeEvent from "@/core/events/Command/EndPointChangeEvent";
import PlayerNameChangeEvent from "@/core/events/Command/PlayerNameChangeEvent";
import StartPointChangeEvent from "@/core/events/Command/StartPointChangeEvent";
import StatusChangeEvent from "@/core/events/Command/StatusChangeEvent";
import ToggleWallEvent from "@/core/events/Command/ToggleWallEvent";
import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";
import InputEvent from "@/core/events/Game/InputEvent";

import Board from "@/core/board/Board";
import GameState from "@/core/GameState";
import GameStateFactory from "@/core/factories/GameStateFactory";
import Player from "@/core/player/Player";
import DefaultGameSetup from "@/shell/DefaultGameSetup";
import EventBus from "@/shell/EventBus";
import FirebaseAPI from "@/shell/firebase/FirebaseAPI";
import { GameFromFirebase, GameStoredInFirebase, SerializableGameState } from "@/shell/firebase/FirebaseTypes";
import SocketIOclient from "@/shell/sockets/SocketIOclient";

import GameStatus from "@components/GameStatus.vue";
import PlayerDisplay from "@components/PlayerDisplay.vue";
import "@/assets/css/game.css";

const eventBus = new EventBus();

export default Vue.extend({
    name: "game",
    components: {
        GameStatus,
        PlayerDisplay
    },
    provide() {
        return {
            eventBus: eventBus
        };
    },
    data(): {
        gameID: string,
        initialGameState: GameState | null;
        gameState: GameState | null;
        playerID: number | null;
        eventBus: EventBus;
        loggedEvents: DispatchedEvent[];
        socket: any;

        newPlayerName: string;
        newStartPoint: string;
        newEndPoint: string;
    } {
        return {
            gameID: "",
            initialGameState: null,
            gameState: null,
            playerID: null,
            eventBus: eventBus,
            loggedEvents: [],
            socket: null,
            
            newPlayerName: "",
            newStartPoint: "",
            newEndPoint: ""
        };
    },
    watch: {
        playerID: {
            immediate: true,
            handler() {
                this.newPlayerName = this.player.name;
            }
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
        },
        gameToImport() : GameStoredInFirebase {
            return FirebaseAPI.makeObjectStorable({
                initialGameState: this.initialGameState!,
                events: this.loggedEvents
            });
        }
    },
    created() {
        const vm = this;
        this.gameID = "1";
        
        const commandEventLogger: EventCallback = (dispatchedEvent: DispatchedEvent): void => {
            vm.loggedEvents.push(dispatchedEvent);
            console.log(`${dispatchedEvent.type}: `, dispatchedEvent.data);
            vm.socket.emit("commandEvent", dispatchedEvent);
        };
        this.eventBus.addListenerToMultipleEvents(["CommandEvent", "InputEvent"], commandEventLogger);
        
        const dispatchedEventListener: EventCallback = (dispatchedEvent: DispatchedEvent): void => {
            const event = EventRunner.makeEventFromDispatchedEvent(dispatchedEvent);
            vm.gameState = event.handle(vm.gameState!);
        };
        this.eventBus.addListener("ToggleWallEvent", dispatchedEventListener);

        //gameState will be null if we dpn't call this, and everything will break
        this.startNewGame();
        this.loadGameFromFirebase();
        this.initializeSockets();
    },
    mounted() {
        this.registerCommandListeners();
    },
    methods: {        
        startNewGame(): void {
            const setup = new DefaultGameSetup();
            const [initialPlayerName, size, startPoint, endPoint, playerIDs, boardIDs] = [setup.getInitialPlayerName(), setup.getSize(), setup.getStartPoint(), setup.getEndPoint(), setup.getPlayerIDs(), setup.getBoardIDs()];

            const initialGameSetupData = {initialPlayerName, size, startPoint, endPoint, playerIDs, boardIDs};
            const initialSetupEvent = new InitialSetupEvent(initialGameSetupData);
            this.gameState = initialSetupEvent.handle(GameStateFactory.createGameState());
            this.initialGameState = JSON.parse(JSON.stringify(this.gameState));
            this.loggedEvents = [];

            this.eventBus.dispatchToAllListeners(initialSetupEvent);

            this.playerID = R.values(this.gameState.players)[0].id;

            this.newStartPoint = JSON.stringify(this.ownedBoard.startPoint);
            this.newEndPoint = JSON.stringify(this.ownedBoard.endPoint);
        },
        
        loadGame(gameToLoad: GameFromFirebase): void {
            const initialGameState = gameToLoad.initialGameState;
            const dispatchedEventsToLoad = gameToLoad.events;
            
            const listOfEvents = EventRunner.makeListOfEvents(dispatchedEventsToLoad);
            const newState = EventRunner.runEvents(listOfEvents, initialGameState);
            
            this.initialGameState = initialGameState;
            this.loggedEvents = dispatchedEventsToLoad;
            this.gameState = newState;
        },
        
        importGame(event: Event): void {
            const element = event.target as HTMLInputElement;
            const gameToLoad: GameStoredInFirebase = JSON.parse(element.value);
            const loadableGame = FirebaseAPI.makeObjectLoadable(gameToLoad);
            this.loadGame(loadableGame);
        },

        loadGameFromFirebase(): void {
            const vm = this;
            const gameLoader = async function() {
                const gameLoadedFromFirebase = await FirebaseAPI.readFrom(vm.gameID);
                if (gameLoadedFromFirebase === null) {
                    return;
                }
                vm.loadGame(gameLoadedFromFirebase);
            };
            gameLoader();
        },

        saveGameToFirebase(): void {
            const gameFromFirebase: GameFromFirebase = {
                initialGameState: this.initialGameState!,
                events: this.loggedEvents
            };
            FirebaseAPI.writeTo(this.gameID, gameFromFirebase);
        },

        initializeSockets(): void {
            const vm = this;
            
            const dispatchedEventListener: EventCallback = (dispatchedEvent: DispatchedEvent): void => {
                console.log(`${dispatchedEvent.type}: `, dispatchedEvent.data);
                vm.loggedEvents.push(dispatchedEvent);
                const event = EventRunner.makeEventFromDispatchedEvent(dispatchedEvent);
                vm.gameState = event.handle(vm.gameState!);
            };
        
            vm.socket = SocketIOclient.init({
                commandEvent: dispatchedEventListener
            },
                "http://localhost:3000"    
            );
        },
        
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
                const player = gameState.players[this.playerID!];

                if (KEYS_TO_COMMANDS.hasOwnProperty(event.code)) {
                    const inputEventData: InputEventData = {
                        command: KEYS_TO_COMMANDS[event.code],
                        player
                    };

                    const inputEvent = new InputEvent(inputEventData);
                    this.gameState = inputEvent.handle(gameState);
                    this.eventBus.dispatchToAllListeners(inputEvent);
                    console.log("inputEvent: ", inputEvent);
                    console.log("gameState: ", gameState);
                }
            });
        },

        changePlayerName(): void {
            const playerNameChangeEvent = new PlayerNameChangeEvent({playerID: this.playerID!, newPlayerName: this.newPlayerName});
            this.gameState = playerNameChangeEvent.handle(this.gameState!);
            this.eventBus.dispatchToAllListeners(playerNameChangeEvent);
        },

        changeStartPoint(): void {
            const newStartPoint: BoardPosition = JSON.parse(this.newStartPoint);
            const startPointChangeEvent = new StartPointChangeEvent({boardID: this.ownedBoardID, newStartPoint});
            this.gameState = startPointChangeEvent.handle(this.gameState!);
            this.eventBus.dispatchToAllListeners(startPointChangeEvent);
        },

        changeEndPoint(): void {
            const newEndPoint: BoardPosition = JSON.parse(this.newEndPoint);
            const endPointChangeEvent = new EndPointChangeEvent({boardID: this.ownedBoardID, newEndPoint});
            this.gameState = endPointChangeEvent.handle(this.gameState!);
            this.eventBus.dispatchToAllListeners(endPointChangeEvent);
        },
        
        changeBoardStatus(newStatus: Status): void {
            const statusChangeEvent = new StatusChangeEvent({boardID: this.ownedBoardID, newStatus});
            this.gameState = statusChangeEvent.handle(this.gameState!);
            console.log(statusChangeEvent);
            console.log(this.gameState);
            this.eventBus.dispatchToAllListeners(statusChangeEvent);
        },

    }
});
</script>
