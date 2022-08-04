import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {Event} from 'src/app/core/model/Event';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

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

  //get all events
  getEventList(page1:number): Observable<Event[]>
  {
    return this._httpclient.get<Event[]>(`${this.baseurl}`+'events'+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get event by id
  getEventById(eventId:number): Observable<Event>
  {
    return this._httpclient.get<Event>(`${this.baseurl}`+'event'+`/${eventId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //add event
  addEvent(eventdata:Event): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'event',eventdata)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update event by id
  updateEvent(eventId:number,eventdata:Event): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'event'+`/${eventId}`,eventdata)
    .pipe(retry(1),catchError(this.handleError));
  }

  //delete event by id
  deleteEvent(eventId:number): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'event'+`/${eventId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //filter event
  //get event with pagination and sorting
  getAllEvent(page:number):Observable<Event[]>
  {
    return this._httpclient.get<Event[]>(`${this.baseurl}`+'event-list'+`/${page}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //filter
  //event by name
  //url --> event-name pagination and pass name
  getEventByNameForFilter(eventName:String,page:number): Observable<Event[]>
  {
    return this._httpclient.get<Event[]>(`${this.baseurl}`+'event-name'+`/${eventName}`+`/${page}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //filter of getting event in notice board of dashboard
  //url--> event-home
  getEventByNameForHome(): Observable<Event[]>
  {
    return this._httpclient.get<Event[]>(`${this.baseurl}`+'event-home')
    .pipe(retry(1),catchError(this.handleError));
  }
}
