import firebaseDB from "./firebase";
import { ElementStoredInFirebase, ElementToStoreInFirebase } from "./FirebaseTypes";

export default class FirebaseAPI {
    private static EMPTY_ARRAY = "EMPTY_ARRAY";

    public static writeTo(gameID: string, elementToStore: ElementToStoreInFirebase) {
        let elementStoredInFirebase: ElementStoredInFirebase = elementToStore;
        if (elementStoredInFirebase.events.length === 0) {
            elementStoredInFirebase.events = FirebaseAPI.EMPTY_ARRAY;
        }
        console.log("writing to firebase:", elementStoredInFirebase);
        firebaseDB.ref(`games/${gameID}`).set(elementStoredInFirebase);
    }

    public static async readFrom(gameID: string): Promise<ElementToStoreInFirebase | null> {
        return firebaseDB.ref(`games/${gameID}`).once("value").then(function(snapshot: firebase.database.DataSnapshot | null) {
            if (snapshot === null) {
                return new Promise<ElementToStoreInFirebase | null>(function(resolve) {
                    resolve(null);
                });
            }
            let elementStoredInFirebase: ElementStoredInFirebase = snapshot.val();
            
            return new Promise<ElementToStoreInFirebase>(function(resolve) {
                console.log("read from firebase:", elementStoredInFirebase);
                
                if (typeof elementStoredInFirebase.events === "string") {
                    let elementLoadedFromFirebase: ElementToStoreInFirebase = {
                        initialGameState: elementStoredInFirebase.initialGameState,
                        events: []
                    };
                    resolve(elementLoadedFromFirebase);
                } else {
                    let elementLoadedFromFirebase: ElementToStoreInFirebase = {
                        initialGameState: elementStoredInFirebase.initialGameState,
                        events: elementStoredInFirebase.events
                    };
                    resolve(elementLoadedFromFirebase);
                }
            });
        });
    }
}