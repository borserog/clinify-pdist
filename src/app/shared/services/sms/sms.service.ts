import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SmsRequest } from "../../model/sms-request.model";

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  private url = "https://notificationfy.herokuapp.com/api/sms"

  constructor(private http: HttpClient) {}

  sendSms(smsRequest: SmsRequest): Observable<any> {
    return this.http.post(this.url, smsRequest)
  }
}
