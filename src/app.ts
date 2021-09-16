import { Maybe } from "./common";
import { Connection } from "./Connection";
import WebSocket from 'ws';

const moonRiverSHash: String        = '0x401a1f9dca3da46f5c4091016c8a2f26dcea05865116b286f60f668207d1474b';
let socket: Maybe<WebSocket>        = null;
let connection: Maybe<Connection>   = null

const handleDisconnect              = async () =>{
    connection?.clean();
    socket?.close();
    socket                          = await Connection.socket();
    bindSocket();
}
const bindSocket                    = async () => {
    socket?.addEventListener('message', Connection.handleFeedData);
    socket?.addEventListener('close', handleDisconnect);
    socket?.addEventListener('error', handleDisconnect);
    subscribe();
}
const subscribe                     = async () => {
    socket?.send(`subscribe:${moonRiverSHash}`);
}
const start                         = async () => {
    socket      = await Connection.socket();
    connection  = await Connection.create(socket, bindSocket);
    subscribe();
}

start()