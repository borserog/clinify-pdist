import { Injectable } from '@angular/core';
import { PatientEmailRequest } from '../model/patient-email-req.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamMailService {
  private RESOURCE_URL = `https://clinify-pdist.herokuapp.com//api/sendPaciente`;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  sendExamEmailNotification(patient: PatientEmailRequest): Observable<unknown> {
    return this.httpClient.post(this.RESOURCE_URL, patient);
  }
}
