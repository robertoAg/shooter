import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SocketWebService } from 'src/app/services/socket-web.services';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {

  room!: string;
  players: String[] = [];

  constructor(
    private socketWebService: SocketWebService,
    private cookieService: CookieService
  ) {
    socketWebService.outEven.subscribe(res => {
      console.log('outEven')
      console.log(res)
    })
    socketWebService.playersInRoom.subscribe(res => {
      console.log('playersInRoom')
      console.log(res)
      this.room = res.room;
      this.cookieService.set('room', this.room)
      this.players = res.players;
    })
    socketWebService.startGame.subscribe(res => {
      console.log('startGame')
      console.log(res)
    })
  }

  ngOnDestroy(): void {
    this.socketWebService.disconnect();
  }

  ngOnInit(): void {
    console.log(this.room)
  }

  send(): void {
    console.log('send')
    let messageInfo = 'prueba'
    // this.socketService.send(messageInfo);
  }
}
