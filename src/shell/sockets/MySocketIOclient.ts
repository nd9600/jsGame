import io from 'socket.io-client';
import * as R from "ramda";

type SocketFunction = (message: any) => any;

interface SocketCallbacks {
    [eventName: string]: SocketFunction
}

export default class MySocketIOclient {
    private static socket: SocketIOClient.Socket;
    
    public static init(callbacks: SocketCallbacks, url = "http://localhost"): SocketIOClient.Socket {
        MySocketIOclient.socket = io(url);
        R.forEachObjIndexed(
            (callback: SocketFunction, eventName) => {
                console.log(eventName)
                MySocketIOclient.socket.on(eventName, callback);
            }, callbacks);
        return MySocketIOclient.socket;
    }
}
