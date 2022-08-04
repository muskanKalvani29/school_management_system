import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {Meeting} from 'src/app/core/model/Meeting';


@Injectable({
  providedIn: 'root'
})
export class ParentsMeetingServiceService {

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

  //parent side
  getAllParentsMeeting(userId:number,page1:number):Observable<Meeting[]>
  {
    return this._httpclient.get<Meeting[]>(`${this.baseurl}`+'meeting-parent-standard-division'+`/${userId}`+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  
  getParentMeetingList(page1:number):Observable<Meeting[]>
  {
    return this._httpclient.get<Meeting[]>(`${this.baseurl}`+'meetings-parent'+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  
  getMeetingListByStandard(standardName:String,page1:number): Observable<Meeting[]>
  {
    return this._httpclient.get<Meeting[]>(`${this.baseurl}`+'meetings-standard'+`?sname=${standardName}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //add na form ma call aal standard and all division from that service

  //filter
  //get meeting by std and division  
  getMeetingListByStandardAndDivision(standardName:String,divisionId:number,page1:number):Observable<Meeting[]>
  {
    return this._httpclient.get<Meeting[]>(`${this.baseurl}`+'meetings-standard-division'+`?sname=${standardName}`+`&dId=${divisionId}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  getParentMeeting(meetingId: number): Observable<Meeting>
  {
    return this._httpclient.get<Meeting>(`${this.baseurl}`+'meeting'+`/${meetingId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  getMeetingByStandardAndTeacher(id:number):Observable<number>
  {
    return this._httpclient.get<number>(`${this.baseurl}`+'teacher-count-meetings'+`/${id}`)
    .pipe(retry(1),catchError(this.handleError));
  }
}
