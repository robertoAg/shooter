import { NgModule } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

const PAGES_COMPONENTS = [
    PagesComponent,
];

@NgModule({
    imports: [
        PagesRoutingModule,
    ],
    declarations: [
        PagesComponent,
    ],
    providers: [SocketService],
    bootstrap: [PagesComponent]
  })
export class PagesModule {
}
