import { Component, OnInit } from '@angular/core';
import {Result} from 'src/app/core/model/Result';
import {ResultService} from 'src/app/features/teacher/pages/results/services/result.service';
import {Router,ActivatedRoute} from '@angular/router';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import { Student } from 'src/app/core/model/Student';
import {ExamType} from 'src/app/core/model/ExamType';
import {StudentServiceService} from 'src/app/features/admin/pages/student/service/student-service.service';
import { Subject } from 'src/app/core/model/Subject';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.css']
})

export class AddResultComponent implements OnInit {

  result:Result;
  student:Student;
  examType:ExamType;
  getGrNo:number;
  getStandard:any;
  subjects:Array<String> = new Array();
  examTypeData: any[] = ["First","Second","Third"];
  yearData: any[] = ['2018','2019','2020','2021'];
  gradeData: any[] = ['A+','A','A-','B+','B','B-','C+','C','C-','D+','D','D-','E+','E','E-','F']
  selectedExamType:any;
  selectedYear:any;
  selectedGrade:any;
  subjectlength:number;
  subjectArr:Array<String> = new Array();
  i:number;
  subDrawing:Boolean=false;subEnglish:Boolean=false;subEnvironment:Boolean=false;subGujarati:Boolean=false;subHindi:Boolean=false;subMaths:Boolean=false;subPathmala:Boolean=false;subpt:Boolean=false;
  subSanskrit:Boolean=false;subScience:Boolean=false;subsocialscience:Boolean=false;
  constructor(private router : Router,private route:ActivatedRoute, private snakBar:MatSnackBar,
    private addResultService:ResultService,private getStudentService:StudentServiceService) { }

  ngOnInit(): void 
  {
    this.getGrNo = this.route.snapshot.params['grNo'];
    this.getSubject();
  }

  getSubject()
  {
    this.getStudentService.getStudent(this.getGrNo).subscribe(data=>{
      console.log(data);
      this.getStandard = data.standard.standardName;
      console.log(this.getStandard)
      this.addResultService.getSubjectByStandard(this.getStandard).subscribe(data=>{
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

  changeExamType(e)
  {
    console.log(e.target.value); 
    this.selectedExamType = e.target.value; console.log(this.selectedExamType);
  }
  changeYear(e)
  {
    console.log(e.target.value); 
    this.selectedYear = e.target.value; console.log(this.selectedYear);
  }
  changeGrade(e)
  {
    console.log(e.target.value); 
    this.selectedGrade = e.target.value; console.log(this.selectedGrade);
  }

  addResult(addResult:any)
  {
    this.result = new Result();
    this.result.student = new Student();
    this.result.examType = new ExamType();
    this.result.student.grNo = this.getGrNo;
    if(this.selectedExamType=="first")
    {
      this.selectedExamType=1;
    }
    else if(this.selectedExamType=="second")
    {
      this.selectedExamType=2;
    }
    else
    {
      this.selectedExamType=3;
    }
    this.result.examType.examtypeId = this.selectedExamType;
    this.result.year = this.selectedYear;
    this.result.gujarati = addResult.gujarati;
    this.result.english = addResult.english;
    this.result.environment = addResult.environment;
    this.result.science = addResult.science;
    this.result.socialscience = addResult.socialscience;
    this.result.maths = addResult.maths;
    this.result.drawing = addResult.drawing;
    this.result.hindi = addResult.hindi;
    this.result.sanskrit = addResult.sanskrit;
    this.result.pt = addResult.pt;
    this.result.pathmala = addResult.pathmala;
    this.result.obtainedMarks = addResult.obtainedMarks;
    this.result.passingmMarks = addResult.passingmMarks;
    this.result.totalMarks = addResult.totalMarks;
    this.result.grade = this.selectedGrade;

    this.addResultService.addResult(this.result).subscribe(data=>{
      console.log(data);
      this.snakBar.open("successfully Added..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.router.navigate(['/teacher/result/all-students']);
    },error=>{
      this.handleError(error);
    })
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
}
