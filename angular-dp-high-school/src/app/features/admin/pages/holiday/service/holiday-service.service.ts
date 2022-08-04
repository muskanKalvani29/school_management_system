import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {Holiday} from 'src/app/core/model/Holiday';

@Injectable({
  providedIn: 'root'
})

export class HolidayServiceService {

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
  //get all holiday
  getHolidayList(page1:number): Observable<Holiday[]>
  {
    return this._httpclient.get<Holiday[]>(`${this.baseurl}`+'holidays'+`/?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get holiday by id
  getHoliday(holidayId:number): Observable<Holiday>
  {
    return this._httpclient.get<Holiday>(`${this.baseurl}`+'holiday'+`/${holidayId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //add holiday
  addHoliday(holidaydata:Holiday): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'holiday',holidaydata)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update holiday by id
  updateHoliday(holidayId:number,holidaydata:Holiday): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'holiday'+`/${holidayId}`,holidaydata)
    .pipe(retry(1),catchError(this.handleError));
  }

  //delete holiday by id
  deleteHoliday(holidayId:number): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'holiday'+`/${holidayId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //filter
  //get holiday with pagination + sorting
  getAllHoliday(): Observable<Holiday[]>
  {
    return this._httpclient.get<Holiday[]>(`${this.baseurl}`+'holiday-list')
    .pipe(retry(1),catchError(this.handleError));
  }

  //filter
  //get holidays by name
  //url --> holiday-name with pagination and pass name
  getHolidayByNameFilter(holidayName:String,page:number): Observable<Holiday[]>
  {
    return this._httpclient.get<Holiday[]>(`${this.baseurl}`+'holiday-name'+`/${holidayName}`+`/${page}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  
  //filter of getting holiday in notice board of dashboard
  //url--> holiday-home
  getHolidayByNameForHome(): Observable<Holiday[]>
  {
    return this._httpclient.get<Holiday[]>(`${this.baseurl}`+'holiday-home')
    .pipe(retry(1),catchError(this.handleError));
  }

  

}
