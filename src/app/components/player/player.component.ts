import { Component, Input } from '@angular/core';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent {
  @Input() player!: Player;
  @Input() shooted!: boolean;
  @Input() phase!: string;
  constructor(){

  }
}