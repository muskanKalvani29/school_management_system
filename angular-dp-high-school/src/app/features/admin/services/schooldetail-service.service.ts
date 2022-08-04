import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {SchoolDetail} from 'src/app/core/model/SchoolDetail';

@Injectable({
  providedIn: 'root'
})
export class SchooldetailServiceService {

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

  //get school detail
  getSchoolDetailList(): Observable<SchoolDetail>
  {
    return this._httpclient.get<SchoolDetail>(`${this.baseurl}`+'schooldetails')
    .pipe(retry(1),catchError(this.handleError));
  }

  //update school detail
  updateSchoolDetail(schoolDetailId:number,schooldetaildata:SchoolDetail): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'schooldetail'+`/${schoolDetailId}`,schooldetaildata)
    .pipe(retry(1),catchError(this.handleError));
  }
}
