import { Injectable } from '@angular/core';
import { IExamService } from '../model/exam-service.model';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Exam, ExamRequest } from '../model/exam.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';

export enum ExamMessageTypes {
  INITIAL,
  NOT_FOUND,
  SUCCESS
}

export interface ExamServiceMessage {
  type: ExamMessageTypes;
  data?: Exam;
}

@Injectable({
  providedIn: 'root'
})
export class ExamFirestoreService implements IExamService {
  private readonly examMessageBusSubject = new BehaviorSubject<ExamServiceMessage>({type: ExamMessageTypes.INITIAL});
  messageBus$ = this.examMessageBusSubject.asObservable();

  private readonly exams$: Observable<Exam[]>;

  private readonly EXAMS_COLLECTION = 'exams';

  private readonly collection: AngularFirestoreCollection<Exam | ExamRequest>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.collection = afs.collection(this.EXAMS_COLLECTION);
    this.exams$ = this.collection.valueChanges({idField: 'id'});
  }

  getAll(): Observable<Exam[]> {
    return this.exams$;
  }

  checkIn(code: string): void {
    // TODO confirmation message in an observable
    this.afs.collection(this.EXAMS_COLLECTION, ref => ref.where('checkInCode', '==', code))
      .snapshotChanges().pipe(take(1))
      .subscribe(async (data) => {
        if (data.length === 0) {
          this.examMessageBusSubject.next({type: ExamMessageTypes.NOT_FOUND});
        } else {
          const documentData = data[0].payload.doc.data() as Exam;
          const documentId = data.map(a => a.payload.doc.id)[0];
          const currentTimestamp = new Date().toISOString();
          await this.afs.doc(`${this.EXAMS_COLLECTION}/${documentId}`).update({checkIn: currentTimestamp});
          this.examMessageBusSubject.next({type: ExamMessageTypes.SUCCESS, data: documentData});
        }
      });
  }

  registerExam(newExam: ExamRequest): Observable<string> {
    return from(this.collection.add(newExam)).pipe(
      map((newExamDocument): string => {
        // TODO passar para API o código e número de telefone
        from(newExamDocument.get()).subscribe((data) => console.log(data.data()));
        return newExamDocument.id;
      })
    );
  }

  removeById(examId: number | string): Observable<void> {
    const inputExamId = typeof examId === 'string' ? examId : examId.toString();

    return from(this.collection.doc(inputExamId).delete());
  }

  generateCheckInCode(): string {
    // This implementation does not deal with colisions
    const randomLetters = Array.from({
        length: 5
      }, () => {
        let initialNum = -Infinity;

        do {
          initialNum = Math.floor(Math.random() * 100);
        } while (initialNum < 65 || initialNum > 90);

        return initialNum;
      }
    ).map((num) => String.fromCharCode(num));

    const randomNums = Array.from({length: 3}, () => Math.floor(Math.random() * 10));

    return [...randomLetters, ...randomNums].join('');
  }
}
