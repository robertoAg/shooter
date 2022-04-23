import { Component } from '@angular/core';

@Component({
    selector: 'app-pages',
    template: `
      <div>
        <a routerLink="/" routerLinkActive="active">Home</a>
        <a class="nav-item nav-link" routerLink="/game" routerLinkActive="active">Game</a>
      </div>
      <div>sadfa</div>
      <!-- main app container -->
        <div class="app-container">
            <router-outlet></router-outlet>
        </div>
    `,
    styles: []
})
export class PagesComponent {

    constructor() {
    }

}
