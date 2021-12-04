export interface Patient {
  id: string | number;
  name: string;
  birthDate: Date;
  healthPlan: string;
  phone: string;
}

export type PatientRequest = Omit<Patient, 'id'>;

