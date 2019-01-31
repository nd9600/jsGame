import io from 'socket.io-client';
import * as R from "ramda";

type SocketFunction = (message: any) => any;

interface SocketCallbacks {
    [eventName: string]: SocketFunction
}

export default class SocketIOapi {
    public static init(callbacks: SocketCallbacks, url = "http://localhost"): void {
        const socket = io(url);
        R.forEachObjIndexed(
            (callback: SocketFunction, eventName) => {
                console.log(eventName + ':' + callback)
                socket.on(eventName, callback);
            }, callbacks);
    }
}