import { NgModule } from '@angular/core';
import { IMPORTS } from '../shared/imports';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { IndexComponent } from './index/index.component';
import { BookComponent } from './book/book.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    PagesComponent,
    IndexComponent,
    BookComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    ...IMPORTS,
    PagesRoutingModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class PagesModule { }
