import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  constructor(
    private cookieService: CookieService
  ) {
    let playerName = 'p' + (Math.random() * 100000 | 0);
    this.cookieService.set('playerName', playerName);
  }
}
