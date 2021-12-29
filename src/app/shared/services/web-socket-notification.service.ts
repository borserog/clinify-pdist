import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketNotificationService {
  updateExamListing = new Subject();

  constructor(private socket: Socket) {
    this.socket.on('notificationToClient', () => {
      this.updateExamListing.next();
    });
  }

  sendNotification(message): void {
    this.socket.emit('notificationToServer', message);
  }
}
