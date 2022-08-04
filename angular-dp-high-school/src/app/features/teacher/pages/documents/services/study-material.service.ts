import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {StudyMaterial} from 'src/app/core/model/StudyMaterial';
import {StudyMaterialType} from 'src/app/core/model/StudyMaterialType';

@Injectable({
  providedIn: 'root'
})
export class StudyMaterialService {

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

  //get all study-material
  // add page in argument
  getStudyMaterialList(page:number): Observable<StudyMaterial[]>
  {
    return this._httpclient.get<StudyMaterial[]>(`${this.baseurl}`+'studymaterials'+`/${page}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get study-material by id
  getStudyMaterial(studymaterialId:number): Observable<StudyMaterial>
  {
    return this._httpclient.get<StudyMaterial>(`${this.baseurl}`+'studymaterial'+`/${studymaterialId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //add study-material
  addStudyMaterial(studyMaterialData:StudyMaterial): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'studymaterial',studyMaterialData)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update study-material by id
  updateStudyMaterial(studymaterialId:number,studyMaterialData:StudyMaterial): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'studymaterial'+`/${studymaterialId}`,studyMaterialData)
    .pipe(retry(1),catchError(this.handleError));
  }

  // delete study-material by id
  deleteStudyMaterial(studymaterialId:number): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'studymaterial'+`/${studymaterialId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //add studyMaterialType service
  //get all study material type
  getStudyMaterialTypeList(): Observable<StudyMaterialType[]>
  {
    return this._httpclient.get<StudyMaterialType[]>(`${this.baseurl}`+'studymaterialTypes')
    .pipe(retry(1),catchError(this.handleError));
  }

  //parent side
  getStudyMaterialByParent(parentId:number,page1:number): Observable<StudyMaterial[]>
  {
    return this._httpclient.get<StudyMaterial[]>(`${this.baseurl}`+'studymaterial-student'+`/${parentId}`+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get sudy material byt teacher
  getByStandardAndTeacher(id:number):Observable<number>
  {
    return this._httpclient.get<number>(`${this.baseurl}`+'teacher-count-studymaterial'+`/${id}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //get study naterial by std
  getStudyMaterialByStandard(standardName:String,page1:number):Observable<StudyMaterial[]>
  {
    return this._httpclient.get<StudyMaterial[]>(`${this.baseurl}`+'studymaterial-standard'+`?sname=${standardName}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
}
