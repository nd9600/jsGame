import Vue from "vue";
import Game from "@/shell/vue/Game.vue";
import * as R from "ramda";

import { DispatchedEvent, EventCallback } from "@/core/@typings/EventTypes";
import EventRunner from "@/core/events/EventRunner";
import InitialSetupEvent from "@/core/events/Game/InitialSetupEvent";

import GameState from "@/core/GameState";
import GameStateFactory from "@/core/factories/GameStateFactory";
import DefaultGameSetup from "@/shell/DefaultGameSetup";
import EventBus from "@/shell/EventBus";
import FirebaseAPI from "@/shell/firebase/FirebaseAPI";
import { GameFromFirebase, GameStoredInFirebase } from "@/shell/firebase/FirebaseTypes";
import MySocketIOclient from "@/shell/sockets/MySocketIOclient";

const eventBus = new EventBus();

const game = new Vue({
    el: "#app",
    components: {
        Game
    },

    provide() {
        return {
            eventBus: eventBus
        };
    },

    data(): {
        loadedGame: boolean;
        gameID: string,
        initialGameState: GameState | null;
        gameState: GameState | null;
        playerID: number ;
        eventBus: EventBus;
        loggedEvents: DispatchedEvent[];
        socket: SocketIOClient.Socket | null;
    } {
        return {
            loadedGame: false,
            gameID: "",
            initialGameState: null,
            gameState: null,
            playerID: -1,
            eventBus: eventBus,
            loggedEvents: [],
            socket: null,
        };
    },

    computed: {
        canPlayGame(): boolean {
            return this.loadedGame
                && this.gameID !== ""
                && this.initialGameState !==  null
                && this.gameState !==  null
                && this.playerID > -1;
        },
        gameToImport() : GameStoredInFirebase {
            return FirebaseAPI.makeObjectStorable({
                gameID: this.gameID,
                initialGameState: this.initialGameState!,
                events: (this.loggedEvents as DispatchedEvent[])
            });
        }
    },

    created() {
        const vm = this;
        
        const commandEventLogger: EventCallback = (dispatchedEvent: DispatchedEvent): void => {
            vm.loggedEvents.push(dispatchedEvent);
            console.log(`${dispatchedEvent.type}: `, dispatchedEvent.data);
            vm.socket!.emit("commandEvent", dispatchedEvent);

            const event = EventRunner.makeEventFromDispatchedEvent(dispatchedEvent);
            vm.gameState = event.handle(vm.gameState!);
        };
        this.eventBus.addListenerToMultipleEvents(["CommandEvent", "InputEvent"], commandEventLogger);

        //gameState will be null if we don't call this, and everything will break
        this.startNewGame();
        this.loadGameFromFirebase();
        this.initializeSockets();
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
        },
        
        loadGame(gameToLoad: GameFromFirebase): void {
            this.loadedGame = false;
            const initialGameState = gameToLoad.initialGameState;
            const dispatchedEventsToLoad = gameToLoad.events;
            
            const listOfEvents = EventRunner.makeListOfEvents(dispatchedEventsToLoad);
            const newState = EventRunner.runEvents(listOfEvents, initialGameState);
            
            this.gameID = gameToLoad.gameID;
            this.initialGameState = initialGameState;
            this.loggedEvents = dispatchedEventsToLoad;
            this.gameState = newState;
            this.loadedGame = true;
        },
        
        importGame(event: Event): void {
            const element = event.target as HTMLInputElement;
            const gameToLoad: GameStoredInFirebase = JSON.parse(element.value);
            const loadableGame = FirebaseAPI.makeObjectLoadable(gameToLoad);
            this.loadGame(loadableGame);
        },

        loadGameFromFirebase(): void {
            if (this.gameID === "") {
                return;
            }

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
                gameID: this.gameID,
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
        
            vm.socket = MySocketIOclient.init({
                commandEvent: dispatchedEventListener
            },
                "http://localhost:3000"    
            );
        },

    }
});
