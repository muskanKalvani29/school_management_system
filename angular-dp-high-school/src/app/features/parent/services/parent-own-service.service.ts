import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {Parent} from 'src/app/core/model/Parent';


@Injectable({
  providedIn: 'root'
})
export class ParentOwnServiceService {

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

  //view profile
  viewParentByUsername(username1:String): Observable<Parent>
  {
    return this._httpclient.get<Parent>(`${this.baseurl}`+'aboutMe-parent'+`?username=${username1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update profile
  updateParentByUserName(username1:String,parent:Parent):Observable<Object>
  {
    return this._httpclient.put(`${this.baseurl}`+'update-parent-profile'+`?username=${username1}`,parent)
    .pipe(retry(1),catchError(this.handleError));
  }
}
