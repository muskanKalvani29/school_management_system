import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {FeeStructure} from 'src/app/core/model/FeeStructure';

@Injectable({
  providedIn: 'root'
})
export class FeeStructureService {

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

  //fee sturucture service
  //get all fee sturucture
  //add pagination here
  getFeeStructureList(page1:number):Observable<FeeStructure[]>
  {
    return this._httpclient.get<FeeStructure[]>(`${this.baseurl}`+'fee-structures'+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get fee structure by id
  getFeeStructure(feeStuctureId:number): Observable<FeeStructure>
  {
    return this._httpclient.get<FeeStructure>(`${this.baseurl}`+'fee-structure'+`/${feeStuctureId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //add fee sturucture
  // addFeeStructure(feeStructureData:FeeStructure): Observable<Object>
  // {
  //   return this._httpclient.post(`${this.baseurl}`+'fee-structure',feeStructureData)
  //   .pipe(retry(1),catchError(this.handleError));
  // }

  //update fee structure by id
  updateFeeStructure(feeStuctureId:number,feeStructureData:FeeStructure): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'fee-structure'+`/${feeStuctureId}`,feeStructureData)
    .pipe(retry(1),catchError(this.handleError));
  }

  //delete fee structure by id
  // deleteFeeStructure(feeStuctureId:number): Observable<any>
  // {
  //   return this._httpclient.delete(`${this.baseurl}`+'fee-structure'+`/${feeStuctureId}`)
  //   .pipe(retry(1),catchError(this.handleError));
  // }

  //filter service
  //get fee structure by meduim
  getFeeStructureByMedium(medium1:String):Observable<FeeStructure[]>
  {
    return this._httpclient.get<FeeStructure[]>(`${this.baseurl}`+'fee-structure'+`?medium=${medium1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get fee structure by meduim and standard
  getFeeStructureByMediumAndStandard(medium1:String,standard1:String): Observable<FeeStructure[]>
  {
    return this._httpclient.get<FeeStructure[]>(`${this.baseurl}`+'MediumAndStandard'+`?medium=${medium1}`+`&standard=${standard1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
}
