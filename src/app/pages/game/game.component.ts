import { Component, PlatformRef, } from '@angular/core';
import { Game } from 'src/app/models/game';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  timer: any;
  time: number = 0;
  timeForChoose: number = 5;
  round: number = 1;
  phaseIndex: number = 0;
  phases: string[] = ['choose', 'interactions', 'result']
  players: Player[] = [];
  result: number = 0;
  game: Game = new Game;
  ended: boolean = false;
  death: boolean = false;
  
  constructor() {
    this.launch();
  }
  launch(){
    this.ended = false;
    this.death = false;
    this.game = new Game;
    this.time = 0;
    this.result = 0;
    this.round = 1;
    this.players = [];
    this.timer = setInterval(() => { 
      this.time = this.time+1;
      this.timeForChoose = this.timeForChoose-1;
      if(this.time%5 === 0){
        this.phasing(); 
      }
    } , 1000)
    for(let i = 0; i<6; i++){
      this.players.push(
        {
          index: i,
          lives: 2,
          bullets: 1,
          name: 'Player ' + i,
          action: 'recharge',
          shootingPlayerIndex: undefined
        }
      )
    }
    this.setActions();
  }
  phasing(){
    this.phaseIndex++;
    if(this.phaseIndex % 3 === 0){
      this.phaseIndex = 0;
      this.timeForChoose = 5;
      this.round = this.round+1;
    }
    if(this.phaseIndex === 0){
      this.players[0].action = 'block';
      this.players[0].shootingPlayerIndex = undefined;
      this.setActions();
    }
    if(this.phaseIndex === 2){
      this.setResults()
    }
  }
  setAction(action: string, i?: number){
    if(action !== 'shoot' || this.players[0].bullets > 0 && this.phases[this.phaseIndex] === 'choose'){
      this.players[0].action = action;
      this.players[0].shootingPlayerIndex = i? i: undefined;
    }
  }
  setActions(){
    this.players.forEach((player, i) => {
      if(player.lives !== 0 && i !== 0){
        if(Math.random() > 0.8){
          player.action = 'block';
          player.shootingPlayerIndex = undefined;
        }else if(player.bullets !== 3 && Math.random() > 0.5 || player.bullets === 0){
          player.action = 'recharge';
          player.shootingPlayerIndex = undefined;
        }else{
          player.action = 'shoot';
          let possibleShootingPlayers = this.players.filter((possibleShootingPlayer, g) => {
            return possibleShootingPlayer.lives !== 0 && g !== i;
          })
          let randomIndex = Math.floor(Math.random()*possibleShootingPlayers.length);
          player.shootingPlayerIndex = possibleShootingPlayers[randomIndex].index;
        }
      }
    });
  }
  setResults(){
    this.players.forEach((player, i) => {
      if(player.lives !== 0){
        if(player.action === 'recharge'){
          player.bullets = player.bullets + 1;
        }
        if(this.beingDamaged(i, player.action === 'block')) {
          player.lives = player.lives - 1;
        }
      }
    })
    this.players.forEach((player, i) => {
      if(player.action === 'shoot'){
        player.bullets = player.bullets - 1;
        if(player.bullets === 2){
          player.bullets = 0;
        }
      }
    })
    // position
    let alives = this.players.filter((player, i) => {
      return i !== 0 && player.lives;
    })
    if(alives.length === 0 || this.players[0].lives === 0 && !this.death){
      this.result = alives.length + 1;
      this.death = true;
    }
    this.players.forEach((player, i) => {
      if(player.lives === 0){
        player.action = '';
        player.shootingPlayerIndex = undefined;
      }
      if(player.lives === 0 && !player.position){
        player.position = alives.length + 1;
        if(this.players[0].lives > 0){
          player.position = player.position + 1;
        }
      }
    })
    if(alives.length === 0 || this.players[0].lives === 0 && alives.length === 1){
      alives[0].position = 1;
      alives[0].action = '';
      alives[0].shootingPlayerIndex = undefined;
    }
    this.saveGame();
    if(alives.length === 0 || this.players[0].lives === 0 && alives.length === 1){
      this.end();
    }
  }
  saveGame(){
    this.game.rounds.push({
      id: this.round,
      players: JSON.parse(JSON.stringify(this.players))
    })
    this.game.result = this.result;
  }
  end(){
    clearInterval(this.timer);
    this.ended = true;
    console.log(this.game)
    let games;
    let gamesRecovered = localStorage.getItem('games');
    games = gamesRecovered? JSON.parse(gamesRecovered) : [];
    games.push(Object.assign({}, this.game));
    localStorage.setItem('games', JSON.stringify(games));
  }
  beingDamaged(i: number, blocking: boolean): boolean{
    let beingDamaged = false;
    this.players.forEach(player => {
      if(player.action === 'shoot' && player.shootingPlayerIndex === i && (!blocking || player.bullets === 3)) {
        beingDamaged = true;
      }
    })
    return beingDamaged;
  }
  showRound(direction:string):void{
    if(direction === 'next'){
      if(this.round < this.game.rounds.length){
        this.round = this.round + 1;
        this.players = this.game.rounds[this.round].players;
      }
    }else if(direction === 'previous'){
      if(this.round !== 1){
        this.round = this.round - 1;
        this.players = this.game.rounds[this.round].players;
      }
    }
  }
}
