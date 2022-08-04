import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {Inquiry} from 'src/app/core/model/Inquiry';

@Injectable({
  providedIn: 'root'
})

export class InquiryServiceService {

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

  //get all inquiry
  getInquiryList(pag1:number): Observable<Inquiry[]>
  {
    return this._httpclient.get<Inquiry[]>(`${this.baseurl}`+'inquiries'+`?page=${pag1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get inquiry by id
  getInquiry(inquiryId:number): Observable<Inquiry>
  {
    return this._httpclient.get<Inquiry>(`${this.baseurl}`+'inquiry'+`/${inquiryId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //add inquiry-response
  addInquiryResponse(inquiryResponse:Inquiry): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'inquiry',inquiryResponse)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update inquiry response by id
  updateInquiryResponse(inquiryId:number,inquiryResponse:Inquiry): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'inquiry'+`/${inquiryId}`,inquiryResponse)
    .pipe(retry(1),catchError(this.handleError));
  }

  //delete inquiry by id
  deleteInquiry(inquiryId:number): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'inquiry'+`/${inquiryId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

}
