import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {Result} from 'src/app/core/model/Result';
import {ResultFile} from 'src/app/core/model/ResultFile';
import {ExamType} from 'src/app/core/model/ExamType';
import { Subject } from 'src/app/core/model/Subject';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private baseurl = "http://localhost:8080/sms/"; 
  setgrNo: number;
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

   //services of result 

  //get all result
  // add page in argument
  getResultList(): Observable<Result[]>
  {
    return this._httpclient.get<Result[]>(`${this.baseurl}`+'results')
    .pipe(retry(1),catchError(this.handleError));
  }

  //get result by id
  getResult(resultId:number): Observable<Result>
  {
    return this._httpclient.get<Result>(`${this.baseurl}`+'result'+`/${resultId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //add result
  addResult(resultData:Result): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'result',resultData)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update result by id
  updateResult(resultId:number,resultData:Result): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'result'+`/${resultId}`,resultData)
    .pipe(retry(1),catchError(this.handleError));
  }

  // delete result by id
  deleteResult(resultId:number): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'result'+`/${resultId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get all resultFile
  // add page in argument
  getResultFilesList(): Observable<ResultFile[]>
  {
    return this._httpclient.get<ResultFile[]>(`${this.baseurl}`+'resultfiles')
    .pipe(retry(1),catchError(this.handleError));
  }

  //get resultFile by id
  getResultFile(resultFileId:number): Observable<ResultFile>
  {
    return this._httpclient.get<ResultFile>(`${this.baseurl}`+'resultfile'+`/${resultFileId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //add resultFile
  addResultFile(resultFileData:Result): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'resultfile',resultFileData)
    .pipe(retry(1),catchError(this.handleError));
  }

  //update resultFile by id
  updateResultFile(resultFileId:number,resultFileData:Result): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'resultfile'+`/${resultFileId}`,resultFileData)
    .pipe(retry(1),catchError(this.handleError));
  }

  // delete resultFile by id
  deleteResultFile(resultFileId:number): Observable<any>
  {
    return this._httpclient.delete(`${this.baseurl}`+'resultfile'+`/${resultFileId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get all examtype services
  getExamTypeList(): Observable<ExamType[]>
  {
    return this._httpclient.get<ExamType[]>(`${this.baseurl}`+'examtypes')
    .pipe(retry(1),catchError(this.handleError));
  }

  //parentside
  getResultFilesListParent(parentId:number,page1:number): Observable<ResultFile[]>
  {
    return this._httpclient.get<ResultFile[]>(`${this.baseurl}`+'resultfile-student-standard'+`/${parentId}`+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //teacher
  //get result by grNo
  getResultByStudent(grNo1:number,page1:number):Observable<Result[]>
  {
    return this._httpclient.get<Result[]>(`${this.baseurl}`+'result-student'+`?grNo=${grNo1}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //setgrNo
  setGrNOForAttendance(grNo:number)
  {
    this.setgrNo = grNo; console.log(this.setgrNo);
  }
  //getgrNo
  getGrNoForAttendance():number
  {
    return this.setgrNo;
    console.log(this.setgrNo);
  }
  
  //get result by s d e and y
  getResultBySAndDAndEAndY(standradName:String,divisionId:number,examTypeId:number,year1:String):Observable<Result[]>
  {
    return this._httpclient.get<Result[]>(`${this.baseurl}`+'result-student-pdf'+`?sname=${standradName}`+`&d_id=${divisionId}`+`&e_id=${examTypeId}`+`&year=${year1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //get all subjects for results
  getSubjectByStandard(standradName:String):Observable<any>
  {
    return this._httpclient.get<any>(`${this.baseurl}`+'subject-standard'+`?sname=${standradName}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //result by exam type
  getResultByStudentAndExamtype(grNo1:number,examType1:String,page1:number):Observable<Result[]>
  {
    return this._httpclient.get<Result[]>(`${this.baseurl}`+'result-student-examtype'+`?grNo=${grNo1}`+`&examType=${examType1}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
}
