import io from 'socket.io-client';
import * as R from "ramda";

type SocketFunction = (message: any) => any;

interface SocketCallbacks {
    [eventName: string]: SocketFunction
}

export default class SocketIOclient {
    private static socket: any;
    
    public static init(callbacks: SocketCallbacks, url = "http://localhost"): void {
        SocketIOclient.socket = io(url);
        R.forEachObjIndexed(
            (callback: SocketFunction, eventName) => {
                console.log(eventName + ':' + callback)
                SocketIOclient.socket.on(eventName, callback);
            }, callbacks);
    }
}
