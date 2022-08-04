import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {Standard} from 'src/app/core/model/Standard';
import {Division} from 'src/app/core/model/Division';
import { Student } from 'src/app/core/model/Student';

@Injectable({
  providedIn: 'root'
})
export class StandardDivisionService {

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

  //standard service
  //get all standard
  getStandardList(): Observable<Standard[]>
  {
    return this._httpclient.get<Standard[]>(`${this.baseurl}`+'standards')
    .pipe(retry(1),catchError(this.handleError));
  }
  
  //division service
  //get all division
  getDivisionList(): Observable<Division[]>
  {
    return this._httpclient.get<Division[]>(`${this.baseurl}`+'divisions')
    .pipe(retry(1),catchError(this.handleError));
  }

  //fillter
  //by std give data with pagination
  //url--> students-standard
  getStudentsListByStandard(page1:number,standardId:number): Observable<Student[]>
  {
    return this._httpclient.get<Student[]>(`${this.baseurl}`+'students-standard'+`?sId=${standardId}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //by std and div give data with pagination
  //url--> students-standard-division
  getStudentsListByStandardDivision(page1:number,standardId:number,divisionId:number): Observable<Student[]>
  {
    return this._httpclient.get<Student[]>(`${this.baseurl}`+'students-standard-divison'+`?sId=${standardId}`+`&dId=${divisionId}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //filter for email
  StudentListByFeeStatusAndStandrad(standardId:number,page1:number): Observable<Student[]>
  {
    return this._httpclient.get<Student[]>(`${this.baseurl}`+'students-feeStatus-standard'+`?sId=${standardId}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  
  StudentListByFeeStatusAndStandardAndDivision(standardId:number,divisionId:number,page1:number):Observable<Student[]>
  {
    return this._httpclient.get<Student[]>(`${this.baseurl}`+'students-feeStatus-standard-division'+`?sId=${standardId}`+`&dId=${divisionId}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get std id by std name
  getStandardId(standardName:String):Observable<any>
  {
    return this._httpclient.get<any>(`${this.baseurl}`+'standard'+`?standard=${standardName}`)
    .pipe(retry(1),catchError(this.handleError));
  }
}
