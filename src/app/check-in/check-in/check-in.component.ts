import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  ExamFirestoreService,
  ExamMessageTypes,
  ExamServiceMessage
} from '../../main/exams/shared/service/exam-firestore.service';
import { map, startWith } from 'rxjs/operators';
import {WebSocketNotificationService} from '../../shared/services/web-socket-notification.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {
  checkInCode = new FormControl('', [Validators.minLength(8), Validators.required]);
  message$;

  constructor(
    private examService: ExamFirestoreService,
    private webSocketNotificationService: WebSocketNotificationService
  ) {
  }

  ngOnInit(): void {
    this.message$ = this.examService.messageBus$.pipe(startWith({}), map((message: ExamServiceMessage) => {
      if (message.type === ExamMessageTypes.NOT_FOUND) {
        return `Atendimento não encontrado`;
      }

      if (message.type === ExamMessageTypes.SUCCESS) {
        const formattedDate = new Date(message.data.date).toLocaleString().slice(0, 11);

        this.webSocketNotificationService.sendNotification(`Check-in for Patient Code ${this.checkInCode.value}`);

        return `Olá ${message.data.patient.name}!\nCheck-in para o atendimento do dia ${formattedDate} realizado com sucesso`;
      }

      return '';
    }));
  }

  onSubmit(): void {
    this.examService.checkIn(this.checkInCode.value);
  }
}
