import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {TimeTable} from 'src/app/core/model/TimeTable';

@Injectable({
  providedIn: 'root'
})

export class TimeTableServiceService {

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

  //get all time table
  getTimetableList(page1:number): Observable<TimeTable[]>
  {
    return this._httpclient.get<TimeTable[]>(`${this.baseurl}`+'timetables'+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get time table by id
  getTimetable(timetableId:number): Observable<TimeTable>
  {
    return this._httpclient.get<TimeTable>(`${this.baseurl}`+'timetable'+`/${timetableId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //add time-table
  addTimetable(timeTableData:TimeTable): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'timetable',timeTableData)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update time-table by id
  // i think no need of update here cause we are just uploading files
  updateTimetable(timetableId:number,timeTableData:TimeTable):Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'timetable'+`/${timetableId}`,timeTableData)
    .pipe(retry(1),catchError(this.handleError));
  }
  
  //delete time tabke by id
  deleteTimetable(timetableId:number): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'timetable'+`/${timetableId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //parent side
  getTimeTableByStudentAndStandard(parentId:number,page1:number): Observable<TimeTable[]>
  {
    return this._httpclient.get<TimeTable[]>(`${this.baseurl}`+'timetable-student-standard'+`/${parentId}`+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //filter
  //timetable by standard
  //url--> timetable-standard with pagination and pass standard id
  getTimetableByStandard(standardName:String,page1:number): Observable<TimeTable[]>
  {
    return this._httpclient.get<TimeTable[]>(`${this.baseurl}`+'timetable-standard'+`?sname=${standardName}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //add na form ma call aal standard and all division from that service

  //filter
  //get timetables by std and division
  //url --> timetable-standard-division with pagination and pass std id and div id
  getTimetableByStandardAndDivision(standardName:String,divisionId:number,page1:number):Observable<TimeTable[]>
  {
    return this._httpclient.get<TimeTable[]>(`${this.baseurl}`+'timetable-standard-division'+`?sname=${standardName}`+`&dId=${divisionId}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
}
