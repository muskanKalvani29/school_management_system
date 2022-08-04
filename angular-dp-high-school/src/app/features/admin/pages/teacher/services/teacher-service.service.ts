import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {Teacher} from 'src/app/core/model/Teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherServiceService {

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

  //get all teacher --> pagination
  getTeacherList(page1:number): Observable<Teacher[]>
  {
    return this._httpclient.get<Teacher[]>(`${this.baseurl}`+'teachers'+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  // get teacher by id
  getTeacher(teacherId: number): Observable<Teacher>
  {
    return this._httpclient.get<Teacher>(`${this.baseurl}`+'teacher'+`/${teacherId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //add teacher no need
  // addTeacher(teacherdata:Teacher): Observable<Object>
  // {
  //   return this._httpclient.post(`${this.baseurl}`+'teacher',teacherdata)
  //   .pipe(retry(1),catchError(this.handleError));
  // }
 
  //update teacher no need
  // updateTeacher(teacherId:number,teacherdata:Teacher): Observable<any>
  // {
  //   return this._httpclient.put(`${this.baseurl}`+'teacher'+`/${teacherId}`,teacherdata)
  //   .pipe(retry(1),catchError(this.handleError));
  // }

  //delete teacher
  deleteTeacher(teacherId:number): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'teacher'+`/${teacherId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //Filter service of getting teacher with count
  getTeacherListCount(): Observable<number>
  {
    return this._httpclient.get<number>(`${this.baseurl}`+'count-teachers')
    .pipe(retry(3),catchError(this.handleError));
  }

  //filter
  //url teacher by name --> teacher-name with pagination
  getTeacherByName(page:number):Observable<Teacher[]>
  {
    return this._httpclient.get<Teacher[]>(`${this.baseurl}`+'teacher-name'+`/${page}`)
    .pipe(retry(1),catchError(this.handleError));
  }

}
