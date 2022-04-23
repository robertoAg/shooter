import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayerModule } from 'src/app/components/player/player.module';
import { GameComponent } from './game.component';

@NgModule({
  imports: [
      CommonModule,
      PlayerModule
  ],
  declarations: [
    GameComponent
  ]
})
export class GameModule {}
