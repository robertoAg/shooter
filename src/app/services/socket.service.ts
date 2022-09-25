import { io, Socket } from "socket.io-client";

export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io("http://localhost:5000", {query: { nameRoom: 2}});
  }

  connect(){
    
  }

  send(mes: any) {
    console.log('send s')
    this.socket.emit("send", mes);
  }

  disconnect(){
    console.log('disconnect')
    this.socket.disconnect();
  }
}
