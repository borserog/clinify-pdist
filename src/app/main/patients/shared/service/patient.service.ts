import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Patient } from '../model/patient.model';
import { IPatientService } from '../model/patient-service.model';

/**
 * @deprecated: Service deprecated in favor of PatientFirestoreService
 */
@Injectable({
  providedIn: 'root'
})
export class PatientService implements IPatientService {

  private static readonly RESOURCE_URL = environment.apiUrl + 'patients';

  constructor(
    private http: HttpClient
  ) { }
  getPatientById(id: string | number): Observable<Patient> {
    throw new Error('Method not implemented.');
  }


  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(
      PatientService.RESOURCE_URL
    ).pipe(
      map((patientsDTO: Patient[]): Patient[] => {
        return patientsDTO.map((patientDTO: Patient): Patient => {
          return {
            ...patientDTO,
          };
        });
      })
    );
  }

  registerPatient(userRegistrationData: Patient): any {
    const { name, birthDate, healthPlan } = userRegistrationData;
    const patientDTO = {
      name,
      birthDate,
      healthPlan
    };

    return this.http.post<Patient>(
      PatientService.RESOURCE_URL,
      patientDTO,
      { headers: {'Content-Type': 'application/json; charset=utf-8'} }
    );
  }

  removeById(examId: number): Observable<Patient> {
    const id = examId.toString();

    return this.http.delete<Patient>(PatientService.RESOURCE_URL + `/${id}`);
  }
}
