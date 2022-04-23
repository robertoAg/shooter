import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayerComponent } from './player.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PlayerComponent
  ],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule {}
