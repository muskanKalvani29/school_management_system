import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {StudyMaterial} from 'src/app/core/model/StudyMaterial';
import {Teacher} from 'src/app/core/model/Teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherOwnServiceService {

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

  //add teacher
  addTeacher(teacherData:Teacher): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'teacher',teacherData)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update teacher by id
  updateTeacher(username1:String,teacherData:Teacher): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'update-teacher-profile'+`?username=${username1}`,teacherData)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get teacher by username
  getTeacherByUserName(username1:String):Observable<Teacher>
  {
    return this._httpclient.get<Teacher>(`${this.baseurl}`+'aboutMe-teacher'+`?username=${username1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //add std of teacher
  addStandards(standards:String[],teacherId:number):Observable<Object>
  {
    let header={
      headers:new HttpHeaders({
        'standardNames':standards.toString(),
        'teacherId':teacherId.toString() 
      })
    }
    return this._httpclient.post(`${this.baseurl}`+'teacher-standards',null,header)
    .pipe(retry(1),catchError(this.handleError));
  }
  //delete std
  deleteStandard(teacherId1:number):Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'teacher-standard'+`?teacherId=${teacherId1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
}
