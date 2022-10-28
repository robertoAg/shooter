import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  playerName!: string;
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {
    this.playerName = 'p' + (Math.random() * 100000 | 0);
    this.cookieService.set('playerName', this.playerName);
  }
  onBtnPlay() {
    this.router.navigate(['/room']);
  }
}
