import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {User} from 'src/app/core/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

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

  //get all user
  getUserList(): Observable<User[]>
  {
    return this._httpclient.get<User[]>(`${this.baseurl}`+'users')
    .pipe(retry(1),catchError(this.handleError));
  }

  //get user by id
  getUser(userId: number): Observable<User>
  {
    return this._httpclient.get<User>(`${this.baseurl}`+'user'+`/${userId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //add user
  addUser(userdata:User): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'user',userdata)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update user by id
  // updateUser(userId:number,userdata:User): Observable<any>
  // {
  //   return this._httpclient.put(`${this.baseurl}`+'user'+`/${userId}`,userdata)
  //   .pipe(retry(1),catchError(this.handleError));
  // }

  //delete user by id
  // deleteUser(userId: number): Observable<any>
  // {
  //   return this._httpclient.delete(`${this.baseurl}`+'user'+`/${userId}`)
  //   .pipe(retry(1),catchError(this.handleError));
  // }
  
}
