import { DispatchedEvent } from "@/core/@typings/EventTypes";
import firebaseDB from "./firebase";

export default class FirebaseAPI {
    public static onFirebaseChange(gameID: string, f: (data: DispatchedEvent[]) => any) {
        firebaseDB.ref(`games/${gameID}`).on("value", function(snapshot: firebase.database.DataSnapshot | null) {
            if (snapshot === null) {
                return;
            }
            const dispatchedEvents: DispatchedEvent[] = JSON.parse(snapshot.val());
            console.log("reading from firebase:", dispatchedEvents);
            f(dispatchedEvents);
        });
    }

    public static writeTo(gameID: string, dispatchedEvents: DispatchedEvent[]) {
        console.log("writing to firebase:", dispatchedEvents);
        firebaseDB.ref(`games/${gameID}`).set(JSON.stringify(dispatchedEvents));
    }

    public static async readFrom(gameID: string): Promise<DispatchedEvent[]> {
        return firebaseDB.ref(`games/${gameID}`).once("value").then(function(snapshot: firebase.database.DataSnapshot | null) {
            if (snapshot === null) {
                return new Promise<DispatchedEvent[]>(function(resolve) {
                    resolve([]);
                });
            }
            const dispatchedEvents: DispatchedEvent[] = JSON.parse(snapshot.val());
            return new Promise<DispatchedEvent[]>(function(resolve) {
                console.log("read from firebase:", dispatchedEvents);
                resolve(dispatchedEvents);
            });
        });
    }
}