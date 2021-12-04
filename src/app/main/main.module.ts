import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { UsersComponent } from './users/users.component';
import { SideNavItemsComponent } from '../layout/side-nav-items/side-nav-items.component';
import { PatientsComponent } from './patients/patients.component';
import { NewPatientComponent } from './patients/new-patient/new-patient.component';
import { ExamsComponent } from './exams/exams.component';
import { NewExamComponent } from './patients/new-exam/new-exam.component';

@NgModule({
  declarations: [
    MainComponent,
    UsersComponent,
    SideNavItemsComponent,
    PatientsComponent,
    NewExamComponent,
    NewPatientComponent,
    ExamsComponent,
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  entryComponents: [
    NewExamComponent,
    NewPatientComponent
  ]
})
export class MainModule { }
