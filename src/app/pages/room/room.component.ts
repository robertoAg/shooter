import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SocketWebService } from 'src/app/services/socket-web.services';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit, OnDestroy {

  room!: string;
  players: String[] = [];
  data: any = { round: 0 };
  timer: any;
  time: number = -4;
  phases: string[] = ['choose', 'interactions', 'result']

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
      this.data = res;
      this.room = res.room;
      this.cookieService.set('room', this.room)
      this.players = res.players;
    })
    socketWebService.startGame.subscribe(res => {
      console.log('startGame')
      console.log(res)
      this.data = res;
      this.data.round = res.round;
      if(this.timer === undefined){
        this.timer = setInterval(() => { 
          this.time = this.time+1;
        } , 1000)
      }
    })
    socketWebService.phasing.subscribe(res => {
      console.log('phasing')
      console.log(res)
      this.data = res;
      this.time = this.data.time;
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
