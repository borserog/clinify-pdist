import { AuthGuard } from './core/auth/auth-guard.guard';
import { UsersComponent } from './main/users/users.component';
import { NewUserComponent } from './login/new-user/new-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { MainComponent } from 'src/app/main/main.component';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';
import { PatientsComponent } from './main/patients/patients.component';
import { ExamsComponent } from './main/exams/exams.component';
import { NewPatientComponent } from './main/patients/new-patient/new-patient.component';
import { CheckInComponent } from './check-in/check-in/check-in.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'new-user', component: NewUserComponent},
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'users', component: UsersComponent},
      {
        path: 'patients', component: PatientsComponent,
        children: [
          {path: 'new-patient', component: NewPatientComponent}
        ]
      },
      {path: 'exams', component: ExamsComponent}
    ]
  },
  {
    path: 'check-in',
    component: CheckInComponent,
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
