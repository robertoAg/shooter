import { Player } from "./player";

interface Round{
  id: number;
  players: Player[];
}

export class Game{
  id: number;
  rounds: Round[];
  result?: number;
  constructor(){
    let currentDate = new Date(); 
    this.id = currentDate.getTime();
    this.rounds = [];
  }
}