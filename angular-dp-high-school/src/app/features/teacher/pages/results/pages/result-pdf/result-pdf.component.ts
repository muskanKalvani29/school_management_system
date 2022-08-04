import { Component, OnInit } from '@angular/core';
import  jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Standard } from 'src/app/core/model/Standard';
import { StandardDivisionService } from 'src/app/features/admin/services/standard-division.service';
import { AuthenticationService } from 'src/app/app-home/services/authentication.service';
import {ResultService} from 'src/app/features/teacher/pages/results/services/result.service';
import { CoreService } from 'src/app/app-home/services/core.service';
import { Teacher } from 'src/app/core/model/Teacher';
import { TeacherOwnServiceService } from 'src/app/features/teacher/services/teacher-own-service.service';
import { Division } from 'src/app/core/model/Division';
import { User } from 'src/app/core/model/User';
import { Result } from 'src/app/core/model/Result';
import { Subject } from 'src/app/core/model/Subject';
import {Router} from '@angular/router';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-result-pdf',
  templateUrl: './result-pdf.component.html',
  styleUrls: ['./result-pdf.component.css']
})
export class ResultPdfComponent implements OnInit {

  title = 'html-to-pdf';
  
  standards:Standard[];
  divisions:Division[];
  tableShow:boolean=false;
  resultsafter34:Array<Result> = new Array();
  results1:Array<Result> = new Array();
  results:Array<Result> = new Array();
  subjects:Array<Subject> = new Array();
  subjectArr:Array<Subject> = new Array();
  pdfSubjectNameArr:[];
  selectedYear: any;
  selectedYearString:any;
  subjectlength:number;
  selectedExamType: any;
  selectedExampTypestring:any;
  selecteddiv: any;
  selectedstd: any;
  userId:number
  userobj:User;
  UserName:String
  isShow:boolean=false;
  teacher:Teacher;
  i:number;
  showHeading:boolean=false;
  subDrawing:Boolean=true;subEnglish:Boolean=true;subEnvironment:Boolean=true;subGujarati:Boolean=true;subHindi:Boolean=true;subMaths:Boolean=true;subPathmala:Boolean=true;subpt:Boolean=true;
  subSanskrit:Boolean=true;subScience:Boolean=true;subsocialscience:Boolean=true;resultLength:number;
  examTypeData: any[] = ["First","Second","Third"];
  yearData: any[] = ['2018','2019','2020','2021'];
  constructor(private getStdDivService:StandardDivisionService,
    private authService:AuthenticationService,private coreService:CoreService,
    private vieResultService:ResultService,
    private getTecharService:TeacherOwnServiceService,private router:Router) { }

    ngOnInit(): void 
    {
      this.getStandardList();
      this.getDivisionList();
    }
    generatePDF() {
      var data = document.getElementById('contentToConvert');
      html2canvas(data).then(canvas => {
        var imgWidth = 208;
        var pageHeight = 295;  
        var imgHeight = canvas.height * imgWidth / canvas.width;
        console.log("imageheight => "+imgHeight);
        var heightLeft = imgHeight;
        console.log("image height");
        console.log(imgHeight);
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4');
        var position = 0;
        pdf.addImage(contentDataURL, 'JPEG', 8,8, imgWidth-17, imgHeight)
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(contentDataURL, 'JPEG', 8,position, imgWidth-17, imgHeight)
          heightLeft -= pageHeight;
        }
        pdf.save('Result.pdf');
      });
   }
    getStandardList()
    {
  
      let user:string[];
      let username:String;
  
      user = localStorage.getItem(this.authService.LOCAL_STORAGE_ATTRIBUTE_USERNAME).split(" ");
      username = atob(user[0]);
      //get user
      this.coreService.getUserByUserName(username).subscribe(data=>
        {
          this.userobj = data;
          this.UserName = username;
          this.userId = this.userobj.userId;
          console.log(this.UserName);
          //get teacher
          this.getTecharService.getTeacherByUserName(this.UserName).subscribe(data=>{
            console.log(data);
            this.teacher = data; console.log(this.teacher);
            this.standards = this.teacher.standard; console.log("stnadard list = > "+this.standards);
          },error=>{
            this.handleError(error);
          })
        },error=>{
          this.handleError(error);
        })
  
      
    }
    //get divisions
    getDivisionList()
    {
      console.log("Division list");
      this.getStdDivService.getDivisionList()
      .subscribe(data=>{
        console.log(data);
        this.divisions=data;
      },error=>{
        this.handleError(error);
      })
    }

    //get selected standard
    changeExamType(e)
    {
      console.log(e.target.value); 
      this.selectedExamType = e.target.value; this.selectedExampTypestring=e.target.value; console.log(this.selectedExamType);
    }
    changeYear(e)
    {
      console.log(e.target.value); 
      this.selectedYear = e.target.value; console.log(this.selectedYear);
      if(this.selectedYear==2019){this.selectedYearString="2018-2019"}
      else if(this.selectedYear==2020){this.selectedYearString="2019-2020"}
      else{this.selectedYearString="2020-2021"}
    }
    changediv(e)
    {
      console.log(e.target.value);
      this.selecteddiv = e.target["selectedIndex"]; console.log(this.selecteddiv);
    }
    //get selected standard
    changestd(e)
    {
      console.log(e.target.value); 
      this.selectedstd = e.target.value; console.log(this.selectedstd);
      console.log(this.selectedstd[0]);
    }
    getResultBySAndDAndEAndY()
    {
      this.results = new Array();
      this.subjects = new Array();
      
      this.vieResultService.getSubjectByStandard(this.selectedstd).subscribe(data=>{
        console.log(data); this.subjects=data; 
        this.subjectlength = data.length;
        this.subjectArr = new Array(this.subjectlength)
        for(this.i=0;this.i<this.subjectlength;this.i++)
        {
          this.subjectArr[this.i] = this.subjects[this.i];
          console.log(this.subjectArr[this.i]);
        }
      },error=>{
        this.handleError(error);
      })
      if(this.selectedExamType=="First"){this.selectedExamType=1}
      else if(this.selectedExamType=="Second"){this.selectedExamType=2}
      else{this.selectedExamType=3}  
     
      this.vieResultService.getResultBySAndDAndEAndY(this.selectedstd,this.selecteddiv,this.selectedExamType,this.selectedYear).subscribe(data=>{
        console.log(data); this.results1 = data; console.log(this.results1); this.resultLength = data.length; this.isShow=true;
        if(this.resultLength>24)
        {
          this.showHeading=true;
          for(this.i=0;this.i<this.resultLength;this.i++)
          {
            if(this.results1[this.i].drawing==null){this.subDrawing=false};
            if(this.results1[this.i].english==null){this.subEnglish=false};
            if(this.results1[this.i].environment==null){this.subEnvironment=false};
            if(this.results1[this.i].gujarati==null){this.subGujarati=false};
            if(this.results1[this.i].hindi==null){this.subHindi=false};
            if(this.results1[this.i].maths==null){this.subMaths=false};
            if(this.results1[this.i].pathmala==null){this.subPathmala=false};
            if(this.results1[this.i].pt==null){this.subpt=false};
            if(this.results1[this.i].sanskrit==null){this.subSanskrit=false};
            if(this.results1[this.i].science==null){this.subScience=false};
            if(this.results1[this.i].socialscience==null){this.subsocialscience=false};
          }
          for(this.i=0;this.i<24;this.i++){
            this.results.push(this.results1[this.i]);
            console.log("this.results");
            console.log(this.resultsafter34);
          }
          for(this.i=24;this.i<this.resultLength;this.i++){
            this.resultsafter34.push(this.results1[this.i]);
            console.log("this.resultsafter34");
            console.log(this.resultsafter34);
          }
        }
        else
        {
          for(this.i=0;this.i<this.resultLength;this.i++)
          {
            if(this.results1[this.i].drawing==null){this.subDrawing=false};
            if(this.results1[this.i].english==null){this.subEnglish=false};
            if(this.results1[this.i].environment==null){this.subEnvironment=false};
            if(this.results1[this.i].gujarati==null){this.subGujarati=false};
            if(this.results1[this.i].hindi==null){this.subHindi=false};
            if(this.results1[this.i].maths==null){this.subMaths=false};
            if(this.results1[this.i].pathmala==null){this.subPathmala=false};
            if(this.results1[this.i].pt==null){this.subpt=false};
            if(this.results1[this.i].sanskrit==null){this.subSanskrit=false};
            if(this.results1[this.i].science==null){this.subScience=false};
            if(this.results1[this.i].socialscience==null){this.subsocialscience=false};
          }
          for(this.i=0;this.i<this.resultLength;this.i++){
            this.results.push(this.results1[this.i]);
            console.log("this.results");
            console.log(this.resultsafter34);
          }
        }
        
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
