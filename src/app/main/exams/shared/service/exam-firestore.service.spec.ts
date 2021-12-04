import { TestBed } from '@angular/core/testing';

import { ExamFirestoreService } from './exam-firestore.service';

describe('ExamFirestoreService', () => {
  let service: ExamFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
