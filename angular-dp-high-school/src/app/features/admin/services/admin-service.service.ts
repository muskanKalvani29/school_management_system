import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {Admin} from 'src/app/core/model/Admin';
import {TeacherRequest} from 'src/app/core/model/TeacherRequest';
import {User} from 'src/app/core/model/User';
import { Student } from 'src/app/core/model/Student';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private baseurl = "http://localhost:8080/sms/"; 
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

  //get admin by id for account setting
  getAdmin(userName:String): Observable<Admin>
  {
    return this._httpclient.get<Admin>(`${this.baseurl}`+'aboutMe-admin'+`?username=${userName}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update admin by id for account setting
  
  updateAdmin(userName:String,admindata:Admin): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'update-admin-profile'+`?username=${userName}`,admindata)
    .pipe(retry(1),catchError(this.handleError));
  }

  //teacher request service
  //get all teacher request with pagination add pagination
  getTeacherRequestList(page1:number): Observable<TeacherRequest[]>
  {
    return this._httpclient.get<TeacherRequest[]>(`${this.baseurl}`+'teacher-requests'+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get teacher request by id --> nayi bane
  // getTeacherRequest(TeacherRequestId:number): Observable<TeacherRequest>
  // {
  //   return this._httpclient.get<TeacherRequest>(`${this.baseurl}`+'teacher-request'+`/${TeacherRequestId}`)
  //   .pipe(retry(1),catchError(this.handleError));
  // }

  //add teacher request --> data will go iun user table
  addTeacherRequest(teacherData : TeacherRequest): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'user',teacherData)
    .pipe(retry(1),catchError(this.handleError));
  }
  //send Email To Teacher Request
  AcceptTeacherRequest(emailId:String,name1:String):Observable<Boolean>
  {
    return this._httpclient.get<Boolean>(`${this.baseurl}`+'accept-teacherRequest'+`?email=${emailId}`+`&name=${name1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //get teacher request by id
  getTeacherRequestById(teacherRequestId:number): Observable<TeacherRequest>
  {
    return this._httpclient.get<TeacherRequest>(`${this.baseurl}`+'teacher-request'+`/${teacherRequestId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //delete teacher request by id
  deleteTeacherRequest(TeacherRequestId:number): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'teacher-request'+`/${TeacherRequestId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //email service with filter
  //1.get those students whose fee status is unpaid
  getStudentByFeeStatus(feeStatus:String,page1:number): Observable<Student[]>
  {
    return this._httpclient.get<Student[]>(`${this.baseurl}`+'students-feeStatus'+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //email filter
  FeePaymentMail(grNo:number): Observable<Boolean>
  {
    return this._httpclient.get<Boolean>(`${this.baseurl}`+'feePayment-email'+`?grNo=${grNo}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //2. get student by std and fee status


  //call get all student from service with count total

  //call get all Teacher from teacher service with count total

  //call get all Parent from service with count total

  //call get all event from event service with sorting and show only 4 record

  //call get all holiday from event service with sorting and show only 4 record

  //call getfeedetailby meduim service from fees service 

  //call update feedetail structure service from fees service

  //call getall standard from standard and division service

  //call getall division from standard and division service

  //call getall meduim from standard and division service

  //call save best student service from upload-image service
  
  //call save activities and achievements from upload-image service

  //getall standard division for email
  
  //filter of getting holiday in notice board of dashboard
  //url--> holiday-home
  

  //filter of getting event in notice board of dashboard
  //url--> event-home
}
