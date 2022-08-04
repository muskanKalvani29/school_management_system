import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
//classes
import {BestStudent} from 'src/app/core/model/BestStudent';
@Injectable({
  providedIn: 'root'
})
export class BestStudentServiceService {

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

  //best student services
  //get all best student
  //add pagination here
  getBestStudentList(page1:number): Observable<BestStudent[]>
  {
    return this._httpclient.get<BestStudent[]>(`${this.baseurl}`+'bestStudents'+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get best student by id
  getBestStudent(bestStudentId:number): Observable<BestStudent>
  {
    return this._httpclient.get<BestStudent>(`${this.baseurl}`+'bestStudent'+`/${bestStudentId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //add best student
  addBestStudent(bestStudentData:BestStudent): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'bestStudent',bestStudentData)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update best student
  updateBestStudent(bestStudentId:number,BestStudentData:BestStudent): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'bestStudent'+`/${bestStudentId}`,BestStudentData)
    .pipe(retry(1),catchError(this.handleError));
  }

  //delete best student
  deleteBestStudent(bestStudentId:number): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'bestStudent'+`/${bestStudentId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //filter
  //best student by name
  //url -> bestStudent-name with pagination??
  getBestStudentByName(name:String): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'bestStudent-name'+`/${name}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //for home
  getBestStudentHome(): Observable<BestStudent[]>
  {
    return this._httpclient.get<BestStudent[]>(`${this.baseurl}`+'bestStudent')
    .pipe(retry(1),catchError(this.handleError));
  }
}
