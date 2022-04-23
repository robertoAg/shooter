import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: 'game',
        component: GameComponent,
    },
    {
        path: '',
        component: HomeComponent,
    },
    { path: '**', redirectTo: '' },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    })
    export class PagesRoutingModule {
}
