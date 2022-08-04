import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {Meeting} from 'src/app/core/model/Meeting';

@Injectable({
  providedIn: 'root'
})

export class TeacherMeetingServiceService {

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

  //get all meetings.. 
  //pass user id here to get data 
  getMeetingList(page1:number): Observable<Meeting[]>
  {
    return this._httpclient.get<Meeting[]>(`${this.baseurl}`+'meetings-teacher'+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get meeting by id
  getMeeting(meetingId:number): Observable<Meeting>
  {
    return this._httpclient.get<Meeting>(`${this.baseurl}`+'meeting'+`/${meetingId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //add meeting
  addMeeting(meetingData:Meeting): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'meeting',meetingData)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update meeting by id
  updateMeeting(meetingId:number,meetingData:Meeting): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'meeting'+`/${meetingId}`,meetingData)
    .pipe(retry(1),catchError(this.handleError));
  }

  //delete meeting by id
  deleteMeeting(meetingId:number): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'meeting'+`/${meetingId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //filter
  //meeting by name
  //url --> meeting-name with pagination
  getAllMeetingByName(meetingName:String,page:number): Observable<Meeting[]>
  {
    return this._httpclient.get<Meeting[]>(`${this.baseurl}`+'meeting-name'+`/${page}`)
    .pipe(retry(1),catchError(this.handleError));
  }
//teacher side
getMeetingByStandardAndTeacher(id:number):Observable<Meeting>
{
  return this._httpclient.get<Meeting>(`${this.baseurl}`+'teacher-count-meetings'+`/${id}`)
  .pipe(retry(1),catchError(this.handleError));
}
  //parent side
  // getParentMeetingList(page1:number)
  // {

  // }
}
