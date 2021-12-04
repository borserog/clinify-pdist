import { Patient } from 'src/app/main/patients/shared/model/patient.model';

export interface Exam {
  id: number | string;
  patient: Patient;
  date: string;
  finished: boolean;
  checkIn?: Date;
  checkInCode?: string;
}

export type ExamRequest = Omit<Exam, 'id'>;
