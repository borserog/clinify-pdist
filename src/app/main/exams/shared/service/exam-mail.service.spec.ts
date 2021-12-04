import { TestBed } from '@angular/core/testing';

import { ExamMailService } from './exam-mail.service';

describe('ExamMailService', () => {
  let service: ExamMailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamMailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
