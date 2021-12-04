import { MessageLevel } from './message-level.enum';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  readonly SNACKBAR_DURATION_MS = 2000;

  constructor(
    private matSnackBar: MatSnackBar
  ) { }

  open(message: string, level: MessageLevel, action?: string): void {
    this.matSnackBar.open(message, action, {
      duration: this.SNACKBAR_DURATION_MS,
      panelClass: [ this.getCssClassForPanel(level) ]
    });
  }

  // gets CSS class without the '.' (dot)
  private getCssClassForPanel(level: MessageLevel): string {
    switch (level) {
      case MessageLevel.DANGER:
        return 'danger-snackbar';
      case MessageLevel.INFO:
        return 'info-snackbar';
      case MessageLevel.SUCCESS:
        return 'success-snackbar';
      default:
        return '';
    }
  }
}
