import { NgModule } from '@angular/core';
import { IMPORTS } from '../shared/imports';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { IndexComponent } from './index/index.component';
import { BookComponent } from './book/book.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    PagesComponent,
    IndexComponent,
    BookComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    ...IMPORTS,
    PagesRoutingModule
  ]
})
export class PagesModule { }
