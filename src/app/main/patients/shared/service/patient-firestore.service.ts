import { from, Observable } from 'rxjs';
import { Patient, NewPatientRequest } from './../model/patient.model';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { IPatientService } from '../model/patient-service.model';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PatientFirestoreService implements IPatientService {
  private readonly patients$: Observable<Patient[]>;

  private readonly COLLECTION_NAME = 'patients';

  private collection: AngularFirestoreCollection<Patient | NewPatientRequest>;

  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection(this.COLLECTION_NAME);
    this.patients$ = this.collection.valueChanges({idField: 'id'});
  }

  getPatientById(id: string | number): Observable<Patient> {
    return this.collection.doc(id.toString()).get().pipe(map((document): Patient => {
      const {name, birthDate, healthPlan, phone, email} = document.data();

      return {
        id: document.id,
        name,
        birthDate,
        healthPlan,
        phone,
        email
      };
    }));
  }

  removeById(id: string | number): Observable<void> {
    return from(this.collection.doc(id.toString()).delete());
  }

  getAll(): Observable<Patient[]> {
    return this.patients$;
  }

  registerPatient(
    patientRegistrationData: Patient
  ): Observable<NewPatientRequest> {
    const {name, birthDate, healthPlan, phone, email} = patientRegistrationData;
    const patientDTO = {
      name,
      birthDate,
      healthPlan,
      phone,
      email
    };

    return from(this.collection.add(patientDTO)).pipe(
      map(
        (): NewPatientRequest => {
          return patientDTO;
        }
      )
    );
  }
}
