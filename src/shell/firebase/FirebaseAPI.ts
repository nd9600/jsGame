import Board from "@/core/board/Board";
import GameStateFactory from "@/core/factories/GameStateFactory";
import Player from "@/core/player/Player";
import firebaseDB from "./firebase";
import { GameFromFirebase, GameStoredInFirebase, SerializableBoard, SerializablePlayer } from "./FirebaseTypes";
import * as R from "ramda";

export default class FirebaseAPI {
    private static EMPTY_ARRAY = "EMPTY_ARRAY";

    public static makeObjectStorable(gameToStore: GameFromFirebase): GameStoredInFirebase {
        let gameState = gameToStore.initialGameState;
        let serialisablePlayers: SerializablePlayer[] = R.map(
            (player: Player) => ({
                id: player.id,
                name: player.name,
                score: player.score,
            }),
            R.values(gameState.players)
        );
        let serializableBoards: SerializableBoard[] = R.map(
            (board: Board) => ({
                id: board.id,
                creatorID: board.creatorID,
                boardData: board.boardData,
                startPoint: board.startPoint,
                endPoint: board.endPoint,
                status: board.status,
            }),
            R.values(gameState.boards)
        );

        let gameStoredInFirebase: GameStoredInFirebase = {
            gameID: gameToStore.gameID,
            initialGameState: {
                players: serialisablePlayers,
                boards: serializableBoards,
            },
            events: gameToStore.events
        };
        return gameStoredInFirebase;
    }

    public static makeObjectLoadable(gameStoredInFirebase: GameStoredInFirebase): GameFromFirebase {
        console.log(gameStoredInFirebase);
        let serializedGameState = gameStoredInFirebase.initialGameState;
        let players: Player[] = R.map(
            (player: SerializablePlayer) => new Player(player.id, player.name, player.score),
            serializedGameState.players
        );
        let boards: Board[] = R.map(
            (board: SerializableBoard) => new Board(board.id, board.creatorID, board.boardData, board.startPoint, board.endPoint, board.status),
            serializedGameState.boards
        );

        let initialGameState = GameStateFactory.createGameState({players, boards});
        if (typeof gameStoredInFirebase.events === "string") {
            return {
                gameID: gameStoredInFirebase.gameID,
                initialGameState,
                events: []
            }
        }
        return {
            gameID: gameStoredInFirebase.gameID,
            initialGameState,
            events: gameStoredInFirebase.events
        };
    }

    public static writeTo(gameID: string, gameToStore: GameFromFirebase) {
        let gameStoredInFirebase: GameStoredInFirebase = FirebaseAPI.makeObjectStorable(gameToStore);
        if (gameStoredInFirebase.events.length === 0) {
            gameStoredInFirebase.events = FirebaseAPI.EMPTY_ARRAY;
        }
        console.log("writing to firebase:", gameStoredInFirebase);
        firebaseDB.ref(`games/${gameID}`).set(gameStoredInFirebase);
    }

    public static async readFrom(gameID: string): Promise<GameFromFirebase | null> {
        return firebaseDB.ref(`games/${gameID}`).once("value").then(function(snapshot: firebase.database.DataSnapshot | null) {
            if (snapshot === null) {
                return new Promise<GameFromFirebase | null>(function(resolve) {
                    resolve(null);
                });
            }
            let gameStoredInFirebase: GameStoredInFirebase = snapshot.val();

            return new Promise<GameFromFirebase>(function(resolve) {
                console.log("read from firebase:", gameStoredInFirebase);
                resolve(FirebaseAPI.makeObjectLoadable(gameStoredInFirebase));
            });
        });
    }
}
