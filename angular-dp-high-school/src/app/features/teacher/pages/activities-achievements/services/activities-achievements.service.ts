import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {Activity} from 'src/app/core/model/Activity';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesAchievementsService {

  private baseurl = "http://localhost:8080/sms/"; 
  setgrNo: number;
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

  //get all activities-achiecements
  // add page in argument
  getActivityList(): Observable<Activity[]>
  {
    return this._httpclient.get<Activity[]>(`${this.baseurl}`+'activities')
    .pipe(retry(1),catchError(this.handleError));
  }

  //get activities-achiecements by id
  getActivity(activityId:number): Observable<Activity>
  {
    return this._httpclient.get<Activity>(`${this.baseurl}`+'activity'+`/${activityId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //add activities-achiecements
  addActivity(activityData:Activity): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'activity',activityData)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update activities-achiecements by id
  updateActivity(activityId:number,activityData:Activity): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'activity'+`/${activityId}`,activityData)
    .pipe(retry(1),catchError(this.handleError));
  }

  // delete activities-achiecements by id
  deleteActivity(activityId:number): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'activity'+`/${activityId}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  
  //get act by grNo
  getAllActivitiesByGrNo(grNo:number,page1:number):Observable<Activity[]>
  {
    return this._httpclient.get<Activity[]>(`${this.baseurl}`+'activities'+`/${grNo}`+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //act by month and year
  getStudentActivityListByMonthAndYear(grNo:number,month1:number,year1:String):Observable<Activity[]>
  {
    return this._httpclient.get<Activity[]>(`${this.baseurl}`+'activities-MAndY'+`/${grNo}`+`?month=${month1}`+`&year=${year1}`+`&page=${year1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //act by month
  getAllStudentActivitiesByMonth(grNo:number,month1:String,page1:number):Observable<Activity[]>
  {
    return this._httpclient.get<Activity[]>(`${this.baseurl}`+'activities-month'+`/${grNo}`+`?month=${month1}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //act by year
  getAllStudentActivitiesByYear(grNo:number,year1:String,page1:number):Observable<Activity[]>
  {
    return this._httpclient.get<Activity[]>(`${this.baseurl}`+'activities-year'+`/${grNo}`+`?year=${year1}`+`&page=${page1}`)
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
}
