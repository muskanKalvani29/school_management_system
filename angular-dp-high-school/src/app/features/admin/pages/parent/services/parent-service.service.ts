import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {Parent} from 'src/app/core/model/Parent';

@Injectable({
  providedIn: 'root'
})
export class ParentServiceService {

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

  //get all parents with pagination
  getParentList(page1:number): Observable<Parent[]>
  {
    return this._httpclient.get<Parent[]>(`${this.baseurl}`+'parents'+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get particular parent by id
  getParent(parentId: number): Observable<Parent>
  {
    return this._httpclient.get<Parent>(`${this.baseurl}`+'parent'+`/${parentId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update parent by id no need
  // updateParent(parentId:number,parentdata:Parent): Observable<any>
  // {
  //   return this._httpclient.put(`${this.baseurl}`+'parent'+`/${parentId}`,parentdata)
  //   .pipe(retry(1),catchError(this.handleError));
  // }

  //delete parent by id --> don't apply here
  deleteParent(parentId:number): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'parent'+`/${parentId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //Filter service
  //get all parent with count
  getParentListCount(): Observable<number>
  {
    return this._httpclient.get<number>(`${this.baseurl}`+'count-parents')
    .pipe(retry(3),catchError(this.handleError));
  }

  //filter
  //get parent by grno
  //url -> parent with grno with pagination
  getParentByGrNo(grNo:number,page1:number):Observable<Parent[]>
  {
    return this._httpclient.get<Parent[]>(`${this.baseurl}`+'parent'+`?grNo=${grNo}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  
}
