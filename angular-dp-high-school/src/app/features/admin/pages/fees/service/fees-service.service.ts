import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {FeePayment} from 'src/app/core/model/FeePayment';
import {FeeStructure} from 'src/app/core/model/FeeStructure';

@Injectable({
  providedIn: 'root'
})

export class FeesServiceService {

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

  //get all fee details
  getFeeDetailList(page1:number): Observable<FeePayment[]>
  {
    return this._httpclient.get<FeePayment[]>(`${this.baseurl}`+'feedetails'+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get fee by id
  getFeePayment(paymentId:number): Observable<FeePayment>
  {
    return this._httpclient.get<FeePayment>(`${this.baseurl}`+'feedetail'+`/${paymentId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //add fee
  addOnlineFeePayment(feePaymentData: FeePayment): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'pay-fee',feePaymentData)
    .pipe(retry(1),catchError(this.handleError));
  }

  addFeePayment(feePaymentData: FeePayment): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'add-fee',feePaymentData)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update fee by id
  updateFeePayment(paymentId:number,feePaymentData:FeePayment): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'feedetail'+`/${paymentId}`,feePaymentData)
    .pipe(retry(1),catchError(this.handleError));
  }

  //delete fee by id
  deleteFeePayment(paymentId:number): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'feedetail'+`/${paymentId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //filter
  //fee detail by std
  //feedetail-standard with pagination pass std
  getFeeDetailsByStandard(standardName:String,page1:number):Observable<FeePayment[]>
  {
    return this._httpclient.get<FeePayment[]>(`${this.baseurl}`+'feedetail-standard'+
    `?s_id=${standardName}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //filter
  //fee detail by std and div
  //feedetail-standard-division
  getFeeDetailsByStdByDiv(standardName:String,divisionName:String,page1:number): Observable<FeePayment[]>
  {
    return this._httpclient.get<FeePayment[]>(`${this.baseurl}`+'feedetail-standard-division'+
    `?s_id=${standardName}`+`&d_id=${divisionName}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //filter
  //change fee status to unpaid
  //fee-status
  updateFeeStatusAllStudent(feeStatus:String): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'student-feeStatus'+`?status=${feeStatus}`,"")
    .pipe(retry(1),catchError(this.handleError));
  }
  

  //parent side fee
  getFeeDetailsByParent(userId:number,page1:number): Observable<FeePayment[]>
  {
    return this._httpclient.get<FeePayment[]>(`${this.baseurl}`+'feedetail-parent'+`/${userId}`+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
}
