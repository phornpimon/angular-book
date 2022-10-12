import { NgModule } from '@angular/core';
import { IMPORTS } from '../shared/imports';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    PagesComponent,
    IndexComponent
  ],
  imports: [
    ...IMPORTS,
    PagesRoutingModule
  ]
})
export class PagesModule { }
