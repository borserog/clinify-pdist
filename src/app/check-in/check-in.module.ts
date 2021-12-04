import { NgModule } from '@angular/core';
import { CheckInComponent } from './check-in/check-in.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CheckInComponent
  ],
  imports: [
    SharedModule
  ]
})
export class CheckInModule { }
