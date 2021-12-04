import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { AppRoutingModule } from '../app-routing.module';
import { NewUserComponent } from './new-user/new-user.component';

@NgModule({
  declarations: [
    LoginComponent,
    NewUserComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ]
})
export class LoginModule { }
