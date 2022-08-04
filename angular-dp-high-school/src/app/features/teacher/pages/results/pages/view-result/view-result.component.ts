import { Component, OnInit } from '@angular/core';
import {Result} from 'src/app/core/model/Result';
import {ResultService} from 'src/app/features/teacher/pages/results/services/result.service';
import {Router,ActivatedRoute} from '@angular/router';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/features/DialogBox/dialog-box/dialog-box.component';
import {StudentServiceService} from 'src/app/features/admin/pages/student/service/student-service.service';
@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {

  grNo:number;
  getStandard:any;
  subjects:Array<String> = new Array();
  results:Array<Result> = new Array();
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  selectedMonth:any;
  selectedYear:any;
  examTypeData: any[] = ["First","Second","Third"];
  subjectlength:number;
  subjectArr:Array<String> = new Array();
  i:number;
  subDrawing:Boolean=false;subEnglish:Boolean=false;subEnvironment:Boolean=false;subGujarati:Boolean=false;subHindi:Boolean=false;subMaths:Boolean=false;subPathmala:Boolean=false;subpt:Boolean=false;
  subSanskrit:Boolean=false;subScience:Boolean=false;subsocialscience:Boolean=false;
  selectedExamType: any;
  showPagination: boolean=false;
  // showPagination:boolean=true;
  constructor(private viewResultService:ResultService,
    private router : Router,
    private route : ActivatedRoute,private snakBar:MatSnackBar,private dialog:MatDialog,private getStudentService:StudentServiceService) { }

  ngOnInit(): void
  {
    this.results = new Array();
    this.grNo =  this.route.snapshot.params['grNo'];
    this.viewResultService.setGrNOForAttendance(this.grNo);
    this.getSubject();
    // this.getResultByYear()
  }
  changeExamType(e)
  {
    console.log(e.target.value); 
    this.selectedExamType = e.target.value; console.log(this.selectedExamType);
  }
  getSubject()
  {
    this.getStudentService.getStudent(this.grNo).subscribe(data=>{
      console.log(data);
      this.getStandard = data.standard.standardName;
      console.log(this.getStandard)
      this.viewResultService.getSubjectByStandard(this.getStandard).subscribe(data=>{
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
  setPage(i,event:any)
  {
    this.page=i;
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;}
    if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false}
    this.getResultByYear();
    // this.getMeetingByStdAndDiv();
  }
  pre()
  {
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;this.page=this.page.valueOf()-1;
      // this.getMeetingList();
      this.getResultByYear();
    }
    if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false}
  }
  next()
  {
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;}
    console.log("page"+this.page)
     if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false; this.page=this.page.valueOf()+1;
      // this.getMeetingList();
      // this.getResultByYear();
    }
  }
  
  goToStudentList()
  {
    console.log("go to studentlist");
    this.router.navigate(['/teacher/result/all-students']);
  }
  //goto Update
  updateResult(resultId:number)
  {
    console.log("go to update attendance");
    this.router.navigate(['/teacher/result/all-students/view-result/update-result',resultId]);
  }
  //goto Delete
  deleteResult(resultId:number)
  { 
    console.log("delete Attendance");
    this.dialog.open(DialogBoxComponent).afterClosed().subscribe(data=>{
      console.log(data.delete)
      if(data.delete)
      { 
        this.viewResultService.deleteResult(resultId).subscribe(data=>{
          console.log(data);
          this.snakBar.open("successfully Deleted..","Cancle", {       
            duration : 3000,
            horizontalPosition:'center',
            verticalPosition:"bottom"
          });
          this.router.navigate(['/teacher/result/all-students']);
        },error=>{
          this.handleError(error);
        })
      }
  },error=>{
    this.handleError(error);
  })
  }
//get selected year

  getResultByYear()
  {
    this.showPagination = true;
    if(this.selectedExamType)
    {
      this.results = new Array();
    this.viewResultService.getResultByStudentAndExamtype(this.grNo,this.selectedExamType,this.page).subscribe(data=>{
      console.log(data); 
      this.results = data['content'] ; console.log(this.results);
        //items per page mate che..
        this.totalPages = data['totalPages'] 
        console.log("total Pages =>"+this.totalPages)
        if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
        else{this.statusNext=false}
        if(this.page==0) {this.statusPre=true; }
        else{this.statusPre=false;}
        this.pages= new Array(data['totalPages'])
        this.viewResultService.setGrNOForAttendance(this.grNo);
    },error=>{
      this.handleError(error);
    })
    
    }
    else{console.log("nothing");}
  }
}
