import { Observable } from 'rxjs/internal/Observable';
import { Patient, NewPatientRequest } from './patient.model';

export interface IPatientService {
  getAll(): Observable<Patient[]>;
  getPatientById(id: string | number): Observable<Patient>;
  removeById(id: string | number): unknown;
  registerPatient(userRegistrationData: Patient): Observable<NewPatientRequest>;
}
