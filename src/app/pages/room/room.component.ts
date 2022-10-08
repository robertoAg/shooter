import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SocketWebService } from 'src/app/services/socket-web.services';
import { Player } from 'src/app/models/player';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit, OnDestroy {

  room!: string;
  players: String[] = [];
  playerUser!: Player;
  playerName!: string;
  death: boolean = false;
  data: any = { round: 0 };
  timer: any;
  time: number = -4;
  phases: string[] = ['choose', 'interactions', 'result']

  constructor(
    private socketWebService: SocketWebService,
    private cookieService: CookieService
  ) {
    this.playerName = this.cookieService.get('playerName');
    console.log('playerName', this.playerName)
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
      let playersUser = res.players.filter((player: Player) => {
        return player.name === this.playerName;
      })
      this.playerUser = playersUser.length? playersUser[0] : undefined;
      if(this.playerUser.lives === 0){
        this.death = true;
      }
    })
  }

  ngOnDestroy(): void {
    this.socketWebService.disconnect();
  }

  ngOnInit(): void {
    console.log(this.room)
  }

  setAction(action: string, i?: number): void {
    if(action !== 'shoot' || this.playerUser.bullets > 0 && this.phases[this.data.phaseIndex] === 'choose'){
      this.playerUser.action = action;
      this.playerUser.shootingPlayerIndex = i;
      console.log('setAction', action, i)
      this.socketWebService.emitEvent(this.playerUser);
    }
  }
}
