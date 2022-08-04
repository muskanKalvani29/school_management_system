import { Component, OnInit } from '@angular/core';
import {Result} from 'src/app/core/model/Result';
import {ResultService} from 'src/app/features/teacher/pages/results/services/result.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import {Router,ActivatedRoute} from '@angular/router';
import { Student } from 'src/app/core/model/Student';
import {StudentServiceService} from 'src/app/features/admin/pages/student/service/student-service.service';
@Component({
  selector: 'app-update-result',
  templateUrl: './update-result.component.html',
  styleUrls: ['./update-result.component.css']
})
export class UpdateResultComponent implements OnInit {

  result:Result;
  resultId:number;
  grNo:number;
  yearData: any[] = ['2018','2019','2020','2021'];
  gradeData: any[] = ['A+','A','A-','B+','B','B-','C+','C','C-','D+','D','D-','E+','E','E-','F']
  examTypeData: any[] = ["First","Second","Third"];
  subjectlength:number;
  subjectArr:Array<String> = new Array();
  i:number;
  getStandard:any;
  subjects:Array<String> = new Array();
  subDrawing:Boolean=false;subEnglish:Boolean=false;subEnvironment:Boolean=false;subGujarati:Boolean=false;subHindi:Boolean=false;subMaths:Boolean=false;subPathmala:Boolean=false;subpt:Boolean=false;
  subSanskrit:Boolean=false;subScience:Boolean=false;subsocialscience:Boolean=false;
  getGrNo: number;
 constructor(private router : Router,
    private route : ActivatedRoute,
    private snakBar:MatSnackBar, private updateResultService: ResultService,private getStudentService:StudentServiceService) { }

    ngOnInit(): void
    {
      this.getGrNo = this.updateResultService.getGrNoForAttendance();
      this.result = new Result();
      this.resultId = this.route.snapshot.params['resultId'];
      this.updateResultService.getResult(this.resultId).subscribe(data=>{
        console.log(data); this.result = data; console.log(this.result);
      },error=>{
        this.handleError(error);
      })
      this.getSubject();
    }

    handleError(error)
    {
    console.log("status code..");  
    console.log(error);
    if(error==404)
    {
      console.log("hi")
      this.router.navigate(['/page-not-found']);
    }
    else if(error==500)
    {
      console.log("hi")
      this.router.navigate(['/internal-server-error']);
    }
    else
    {
      console.log("hi")
      this.router.navigate(['/error-page']);
    }
  }
  getSubject()
  {
    this.getStudentService.getStudent(this.getGrNo).subscribe(data=>{
      console.log(data);
      this.getStandard = data.standard.standardName;
      console.log(this.getStandard)
      this.updateResultService.getSubjectByStandard(this.getStandard).subscribe(data=>{
      console.log(data); this.subjects=data; 
      this.subjectlength = data.length;
      this.subjectArr = new Array(this.subjectlength)
      for(this.i=0;this.i<this.subjectlength;this.i++)
      {
        this.subjectArr[this.i] = this.subjects[this.i];
        if(this.subjectArr[this.i]=="Gujarati"){this.subGujarati=true;console.log("subGujarati")}
        else if(this.subjectArr[this.i]=="English"){this.subEnglish=true;console.log("subEnglish")}
        else if(this.subjectArr[this.i]=="Environment"){this.subEnvironment=true;console.log('subEnvironment')}
        else if(this.subjectArr[this.i]=="Science"){this.subScience=true;console.log("subScience")}
        else if(this.subjectArr[this.i]=="SocialScience"){this.subsocialscience=true;console.log("subsocialscience")}
        else if(this.subjectArr[this.i]=="Maths"){this.subMaths=true;console.log("subMaths")}
        else if(this.subjectArr[this.i]=="Hindi"){this.subHindi=true;console.log("subHindi")}
        else if(this.subjectArr[this.i]=="Sanskrit"){this.subSanskrit=true;console.log("subSanskrit")}
        else if(this.subjectArr[this.i]=="P.T."){this.subpt=true;console.log("subpt")}
        else if(this.subjectArr[this.i]=="Drawing"){this.subDrawing=true;console.log("this.subDrawing=true")}
        else{this.subPathmala=true;console.log("this.subPathmala=true")}
        console.log(this.subjectArr[this.i]);
      }
    },error=>{
      this.handleError(error);
    })
    },error=>{
      this.handleError(error);
    })
    
  }

     //on submit
     onSubmit()
     {
       console.log("form update");
       this.updateResult();
     }

     updateResult()
     {
       this.result.student = new Student();
       this.grNo = this.updateResultService.getGrNoForAttendance(); console.log(this.grNo);
       this.result.student.grNo = this.grNo;
       if(this.result.examType.examtypeName=="first"){this.result.examType.examtypeId=1;}
       else if(this.result.examType.examtypeName=="second"){this.result.examType.examtypeId=2;}
       else {this.result.examType.examtypeId=3;}
       this.updateResultService.updateResult(this.resultId,this.result).subscribe(data=>{
         console.log(data); 
         this.snakBar.open("successfully Updated..","Cancle", {       
           duration : 3000,
           horizontalPosition:'center',
           verticalPosition:"bottom"
         });
         console.log(this.grNo);
         this.router.navigate(['/teacher/result/all-students/view-result',this.grNo]);
       },error=>{
        this.handleError(error);
      })
     }

}
