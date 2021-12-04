import { FirestoreModule } from './firestore/firestore.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthModule,
    FirestoreModule
  ],
  exports: [
    HttpClientModule,
    AuthModule,
    FirestoreModule
  ]
})
export class CoreModule { }
