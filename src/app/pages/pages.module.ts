import { NgModule } from '@angular/core';
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
    providers: [],
    bootstrap: [PagesComponent]
  })
export class PagesModule {
}
