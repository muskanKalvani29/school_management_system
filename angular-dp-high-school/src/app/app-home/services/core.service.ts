import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {User} from 'src/app/core/model/User';
import { TeacherRequest } from 'src/app/core/model/TeacherRequest';
import { Parent } from 'src/app/core/model/Parent';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

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


  //get user by user-name
  getUserByUserName(username1:String): Observable<User>
  {
    return this._httpclient.get<User>(`${this.baseurl}`+'user-username'+`?username=${username1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //register service
  //add teacher request
  addTeacherRequest(teacher:TeacherRequest):Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'teacher-request',teacher)
    .pipe(retry(1),catchError(this.handleError));
  }
  //add parent
  addParent(parent:Parent): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'parent',parent)
    .pipe(retry(1),catchError(this.handleError));
  }
  //chack username for teacher
  getUser(username1:String):Observable<boolean>
  {
    return this._httpclient.get<boolean>(`${this.baseurl}`+'user-uname'+`?username=${username1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //to check parent is there for required gr no
  getParentAndStudentByGrNo(grNo1:number):Observable<boolean>
  {
    return this._httpclient.get<boolean>(`${this.baseurl}`+'parent-student-grNo'+`?grNo=${grNo1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
 

}
