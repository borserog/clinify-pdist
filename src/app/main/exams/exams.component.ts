import {noop, Observable, Subject} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {switchMap, take, tap} from 'rxjs/operators';
import {MessageLevel} from 'src/app/shared/services/snackbar/message-level.enum';
import {MessageService} from 'src/app/shared/services/snackbar/message.service';
import {Exam} from './shared/model/exam.model';
import {ExamService} from './shared/service/exam.service';
import {ExamFirestoreService} from './shared/service/exam-firestore.service';
import {WebSocketNotificationService} from '../../shared/services/web-socket-notification.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  readonly examsSubject = new Subject<Exam[]>();
  exams$: Observable<Exam[]>;

  columnsToDisplay = ['patient', 'healthPlan', 'date', 'checkInCode', 'checkIn', 'actionsRow'];

  constructor(
    private depExamService: ExamService,
    private examService: ExamFirestoreService,
    private snackbar: MessageService,
    private webSocketNotification: WebSocketNotificationService
  ) {
  }

  ngOnInit(): void {
    this.exams$ = this.examsSubject;

    this.loadExams();

    this.webSocketNotification.updateExamListing.pipe(
      switchMap(() => {
        return this.snackbar.open('Novo Check-in Foi Realizado', MessageLevel.INFO, 'Recarregar').onAction().pipe(
          tap(() => {
            this.loadExams();
          })
        );
      })
    ).subscribe(noop);
  }

  startExam(exam: Exam): void {
    // sets exam finished flag to true;

    console.log(`exam started for patient ${exam.patient.name}`);
  }

  deleteExam(exam: Exam): void {
    this.examService.removeById(exam.id).pipe(take(1)).subscribe(() => {
        this.snackbar.open('Consulta Deletada!', MessageLevel.INFO);
        this.loadExams();
      }
    );
  }

  private loadExams(): void {
    this.examService.getAll().pipe(take(1))
      .subscribe((exams: Exam[]): void => {
        this.examsSubject.next(exams);
      });
  }

  refresh(): void {
    this.loadExams();
  }

  sendMessage(): void {
    this.webSocketNotification.sendNotification(`this is a test message`);
  }
}
