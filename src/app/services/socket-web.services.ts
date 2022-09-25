import { EventEmitter, Injectable, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class SocketWebService extends Socket {

  @Output() outEven: EventEmitter<any> = new EventEmitter();
  @Output() playersInRoom: EventEmitter<any> = new EventEmitter();
  @Output() startGame: EventEmitter<any> = new EventEmitter();

  constructor(
    public cookieService: CookieService,

  ) {
    super({
      url: 'http://localhost:5000',
      options: {
        query: {
          roomName: cookieService.get('room'),
          playerName: 'p' + (Math.random() * 100000 | 0)
        },
      }
    })
    this.listen();
  }

  listen = () => {
    this.ioSocket.on('evento', (res: any) => this.outEven.emit(res));  
    this.ioSocket.on('playersInRoom', (res: any) => this.playersInRoom.emit(res));  
    this.ioSocket.on('startGame', (res: any) => this.startGame.emit(res));  
  }
  
  emitEvent = (payload = {}) => {
    this.ioSocket.emit('evento', payload)
  }
}