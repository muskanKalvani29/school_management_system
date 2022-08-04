import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {Query} from 'src/app/core/model/Query';

@Injectable({
  providedIn: 'root'
})
export class QueryServiceService {

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
  //get all queries
  getQueryList(page1:number): Observable<Query[]>
  {
    return this._httpclient.get<Query[]>(`${this.baseurl}`+'queries'+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get query by id
  getQuery(queryId:number): Observable<Query>
  {
    return this._httpclient.get<Query>(`${this.baseurl}`+'query'+`/${queryId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //add query response
  addQueryResponse(queryResponse:Query): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'query',queryResponse)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update query response by id
  updateQuery(queryId:number,queryResponse:Query): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'query'+`/${queryId}`,queryResponse)
    .pipe(retry(1),catchError(this.handleError));
  }

  //delete query by id
  deleteQuery(queryId:number): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'query'+`/${queryId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //parent side query
  getQueryByParentId(parentId:number,page1:number):Observable<Query[]>
  {
    return this._httpclient.get<Query[]>(`${this.baseurl}`+'query-parent'+`/${parentId}`+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  
}
