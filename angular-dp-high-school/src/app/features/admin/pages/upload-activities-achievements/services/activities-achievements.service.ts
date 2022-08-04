import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
//classes
import {Image} from 'src/app/core/model/Image';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesAchievementsService {

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

  //services of activities and achievements
  //get all activities and achievements
  getImageList(page1:number): Observable<Image[]>
  {
    return this._httpclient.get<Image[]>(`${this.baseurl}`+'images'+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get activities and achievements by id
  getImage(imageId:number): Observable<Image>
  {
    return this._httpclient.get<Image>(`${this.baseurl}`+'image'+`/${imageId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //add activities and achievements
  addImage(ImageData:Image): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'image',ImageData)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update  activities and achievements by id
  updateImage(imageId:number,ImageData:Image): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'image'+`/${imageId}`,ImageData)
    .pipe(retry(1),catchError(this.handleError));
  }

  //delete  activities and achievements by id
  deleteImage(imageId:number): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'image'+`/${imageId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //filter by name
  //image image-name pagination??
  getImageByName(name:string): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'image-name'+`/${name}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //home page 
  getImageByActivity():Observable<Image[]>
  {
    return this._httpclient.get<Image[]>(`${this.baseurl}`+'image-activity')
    .pipe(retry(1),catchError(this.handleError));
  }

  //ImageByAchievement
  getImageByAchievement():Observable<Image[]>
  {
    return this._httpclient.get<Image[]>(`${this.baseurl}`+'image-achievement')
    .pipe(retry(1),catchError(this.handleError));
  }
}
