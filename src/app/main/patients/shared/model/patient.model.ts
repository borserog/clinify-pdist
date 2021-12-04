export interface Patient {
  id: string | number;
  name: string;
  birthDate: Date;
  healthPlan: string;
  phone: string;
  email: string;
}

export type NewPatientRequest = Omit<Patient, 'id'>;

