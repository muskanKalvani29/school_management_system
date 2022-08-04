import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {Attendance} from 'src/app/core/model/Attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private baseurl = "http://localhost:8080/sms/"; 
  setgrNo:number;
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

  //get all attendance
  getAttendanceList(): Observable<Attendance[]>
  {
    return this._httpclient.get<Attendance[]>(`${this.baseurl}`+'attendances')
    .pipe(retry(1),catchError(this.handleError));
  }

  //get attendance by id
  getAttendance(attendanceId:number): Observable<Attendance>
  {
    return this._httpclient.get<Attendance>(`${this.baseurl}`+'attendance'+`/${attendanceId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //add attendance
  addAttendance(attendanceData:Attendance): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'attendance',attendanceData)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update attendance by id
  updateAttendance(attendanceId:number,attendanceData:Attendance): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'attendance'+`/${attendanceId}`,attendanceData)
    .pipe(retry(1),catchError(this.handleError));
  }

  //delete attendance by id
  deleteAttendance(attendanceId:number): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'attendance'+`/${attendanceId}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //teacher
  //get attendance by grno
  getAttendancesByStudentId(grNo:number,page1:number):Observable<Attendance[]>
  {
    return this._httpclient.get<Attendance[]>(`${this.baseurl}`+'attendances'+`/${grNo}`+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //setgrNo
  setGrNOForAttendance(grNo:number)
  {
    this.setgrNo = grNo; console.log(this.setgrNo);
  }
  //getgrNo
  getGrNoForAttendance():number
  {
    return this.setgrNo;
    console.log(this.setgrNo);
  }
  //get att by month and year
  getAttendanceByMonthAndYear(grNo:number,month1:String,year1:String):Observable<Attendance[]>
  {
    return this._httpclient.get<Attendance[]>(`${this.baseurl}`+'attendance-MAndY'+`/${grNo}`+`?month=${month1}`+`&year=${year1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //get att by month
  getAttendanceByMonth(grNo:number,month1:String,page1:number):Observable<Attendance[]>
  {
    return this._httpclient.get<Attendance[]>(`${this.baseurl}`+'attendance-month'+`/${grNo}`+`?month=${month1}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //get att by year
  getAttendanceByYear(grNo:number,year1:String,page1:number):Observable<Attendance[]>
  {
    return this._httpclient.get<Attendance[]>(`${this.baseurl}`+'attendance-year'+`/${grNo}`+`?year=${year1}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
}
