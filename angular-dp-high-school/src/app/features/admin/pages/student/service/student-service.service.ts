import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , throwError} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import { Student } from 'src/app/core/model/Student';
import { Activity } from 'src/app/core/model/Activity';
import { Attendance } from 'src/app/core/model/Attendance';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
 
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
  //get all students
  getstudentList(page1:number): Observable<Student[]>
  {
    return this._httpclient.get<Student[]>(`${this.baseurl}`+'students'+`?page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }  

 //save student
  addStudent(studentdata:Student): Observable<Object>
  {
    return this._httpclient.post(`${this.baseurl}`+'student',studentdata)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get student by id
  getStudent(grNo: number): Observable<Student>
  {
    return this._httpclient.get<Student>(`${this.baseurl}`+'student'+`/${grNo}`)
    .pipe(retry(1),catchError(this.handleError));
  }
   //update student by id
   //change type of this at last
  updateStudent(grNo: number,studentdata:Student): Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'student'+`/${grNo}`,studentdata)
    .pipe(retry(1),catchError(this.handleError));
  }

   //delete student by id
  deleteStudent(grNo: number): Observable<any>
  {
    console.log("hi there delete");
    return this._httpclient.delete(`${this.baseurl}`+'student'+`/${grNo}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //Filter of getting all student by count
  getStudentListCount(): Observable<number>
  {
    return this._httpclient.get<number>(`${this.baseurl}`+'count-students')
    .pipe(retry(3),catchError(this.handleError));
  }

  //student promotion
  //url --> student-standard-update
  updateStudentStandard(from:String,to:String) : Observable<any>
  {
    return this._httpclient.put(`${this.baseurl}`+'student-standard-update'+`?from_standard=${from}`+`&to_standard=${to}`,"")
    .pipe(retry(1),catchError(this.handleError));
  }


  //parent side
  //student by parentId
  getStudentByParentId(parentId:number): Observable<Student>
  {
    return this._httpclient.get<Student>(`${this.baseurl}`+'student-info'+`/${parentId}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //get student activity by month and year
  getActivityByMonthAndYear(userId:number,Month:number,Year:String):Observable<Activity[]>
  {
    return this._httpclient.get<Activity[]>(`${this.baseurl}`+'activity-student'+`/${userId}`+`?month=${Month}`+`&year=${Year}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  //get student ach by month and year
  getAttendanceByMonthAndYear(userId:number,Month:String,Year:String):Observable<Attendance>
  {
    return this._httpclient.get<Attendance>(`${this.baseurl}`+'attendance-student'+`/${userId}`+`?month=${Month}`+`&year=${Year}`)
    .pipe(retry(1),catchError(this.handleError));
  }
   //teacher side
  getStudentByStandardAndTeacher(id:number):Observable<number>
  {
    return this._httpclient.get<number>(`${this.baseurl}`+'teacher-count-students'+`/${id}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  //teacher
  getStudentByStandardId(standardName:String,page1:number):Observable<Student[]>
  {
    return this._httpclient.get<Student[]>(`${this.baseurl}`+'students-standard'+`?sname=${standardName}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
  getStrudentByStandardAndDivision(standardName:String,divisionId:number,page1:number):Observable<Student[]>
  {
    return this._httpclient.get<Student[]>(`${this.baseurl}`+'students-standard-divison'+`?sname=${standardName}`+`&dId=${divisionId}`+`&page=${page1}`)
    .pipe(retry(1),catchError(this.handleError));
  }
 }

 