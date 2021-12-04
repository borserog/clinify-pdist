import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Exam, ExamRequest} from '../model/exam.model';
import {IExamService} from '../model/exam-service.model';

/**
 * @deprecated use firestore
 */
@Injectable({
  providedIn: 'root'
})
export class ExamService implements IExamService {
  static readonly RESOURCE_URL = environment.apiUrl + 'exams';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Exam[]> {
    return this.http.get<Exam[]>(ExamService.RESOURCE_URL);
  }

  registerExam(newExam: ExamRequest): Observable<any> {
    return this.http.post<Exam>(ExamService.RESOURCE_URL, newExam);
  }

  removeById(examId: number): Observable<any> {
    const id = examId.toString();

    return this.http.delete<Exam>(ExamService.RESOURCE_URL + `/${id}`);
  }
}
