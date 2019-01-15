import firebaseDB from "./firebase";
import { DispatchedEvent } from "@/core/@typings/EventTypes";

export default class FirebaseAPI {
    public static onFirebaseChange(gameID: string, f: (data: any) => any) {
        firebaseDB.ref(`games/${gameID}`).on("value", f);
    }

    public static writeTo(gameID: string, events: DispatchedEvent[]) {
        firebaseDB.ref(`games/${gameID}`).set(events);
    }
}