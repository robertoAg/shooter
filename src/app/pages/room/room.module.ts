import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayerModule } from 'src/app/components/player/player.module';
import { RoomComponent } from './room.component';

@NgModule({
  imports: [
      CommonModule,
      PlayerModule
  ],
  declarations: [
    RoomComponent
  ]
})
export class RoomModule {}
