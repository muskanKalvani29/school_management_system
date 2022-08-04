import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import { User } from 'src/app/core/model/User';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private baseurl = "http://localhost:8080/sms/"; 
  emailData:String;
  constructor(private _httpclient: HttpClient) { }

  handleError(error:any) 
  {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `${error.status}`;
    } else {
      // server-side error
      errorMessage = ` ${error.status}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }


  //reset password service
  //check old password is exist or not
  ResetPassword(oldPassword:String,userId:number):Observable<Boolean>
  {
    return this._httpclient.get<Boolean>(`${this.baseurl}`+'authenticate-oldPassword'+`?password=${oldPassword}`+`&user_id=${userId}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //update password
  UpdateUserPassword(newPassword:String,userId:number):Observable<any>
  {
    return this._httpclient.get<any>(`${this.baseurl}`+'update-password'+`?password=${newPassword}`+`&user_id=${userId}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //forgot password service
  SendOtp(emailid:String):Observable<Object>
  {
    return this._httpclient.get<Object>(`${this.baseurl}`+'send-otp'+`?email=${emailid}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  VerifyOtp(OTP:String,userId:number):Observable<Boolean>
  {
    return this._httpclient.get<Boolean>(`${this.baseurl}`+'verify-otp'+`?otp=${OTP}`+`&user_id=${userId}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //otp 
  setEmail(id:String)
  {
    this.emailData = id;
    return this.emailData
  }
  //get email
  getEmail()
  {
    return this.emailData;
  }

  //get User By emial
  getUserByEmail(emailId:String):Observable<User>
  {
    return this._httpclient.get<User>(`${this.baseurl}`+'email-user'+`?email=${emailId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //inquiry email
  sendInquiryResponseEmail(Inquiry:Object):Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'email-inquiry',Inquiry)
    .pipe(retry(1),catchError(this.handleError));
  }
}
