import { Patient } from 'src/app/main/patients/shared/model/patient.model';
import { MessageService } from '../../../shared/services/snackbar/message.service';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageLevel } from 'src/app/shared/services/snackbar/message-level.enum';
import { MatDialogRef } from '@angular/material/dialog';
import { PatientFirestoreService } from '../shared/service/patient-firestore.service';

interface SignUpControls {
  name: AbstractControl;
  birthDate: AbstractControl;
  healthPlan: AbstractControl;
  phone: AbstractControl;
}

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit, OnDestroy {
  componentDestroyedSubject = new Subject();

  signUpForm: FormGroup;
  controls: SignUpControls;

  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private patientFirestoreService: PatientFirestoreService,
    private snackbar: MessageService,
    public dialogRef: MatDialogRef<NewPatientComponent>
  ) {
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: [''],
      birthDate: [''],
      healthPlan: [''],
      phone: ['']
    });

    this.controls = {
      name: this.signUpForm.get('name'),
      birthDate: this.signUpForm.get('birthDate'),
      healthPlan: this.signUpForm.get('healthPlan'),
      phone: this.signUpForm.get('phone')
    };
  }

  ngOnDestroy(): void {
    this.componentDestroyedSubject.complete();
  }

  onSubmit(): void {
    this.patientFirestoreService.registerPatient(this.signUpForm.value).pipe(
      takeUntil(this.componentDestroyedSubject)
    )
      .subscribe(() => {
          this.snackbar.open(`Paciente cadastrado com Sucesso!`, MessageLevel.SUCCESS);
          this.dialogRef.close();
        },
        (error) => {
          this.errorMessage = error.message;
          this.snackbar.open('Deu Ruim!', MessageLevel.DANGER);
        });
  }

  isFormValid(): boolean {
    return this.controls.name.valid
      && this.controls.birthDate.valid
      && this.controls.healthPlan.valid;
  }
}
