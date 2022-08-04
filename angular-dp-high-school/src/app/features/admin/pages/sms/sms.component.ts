import { Component, OnInit } from '@angular/core';
import {Student} from 'src/app/core/model/Student';
import {AdminServiceService} from 'src/app/features/admin/services/admin-service.service';
import {StandardDivisionService} from 'src/app/features/admin/services/standard-division.service';
import {Standard} from 'src/app/core/model/Standard';
import {Division} from 'src/app/core/model/Division';
import {Router} from '@angular/router';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit {

  students: Array<Student> = new Array()
  standards:Standard[];
  divisions:Division[];
  length:number;
  selectedstd:any;
  selecteddiv:any;
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  showSnackbar:Boolean=false
  noofelements:number
  
  constructor(private _getadminservice:AdminServiceService,
              private getStdDivService:StandardDivisionService,
              private router:Router,
              private snakBar:MatSnackBar) { }

  ngOnInit(): void 
  {
    console.log("on init");
    console.log("page"+this.page)
    this.getStudentByFeeStatus();
    this.getStandardList();
    this.getDivisionList();
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
    this.getStudentByFeeStatus();
  }
  pre()
  {
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;this.page=this.page.valueOf()-1;
      this.getStudentByFeeStatus();}
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
      this.getStudentByFeeStatus();}
  }
  getStandardList()
  {
    console.log("Stanadard list");
    this.getStdDivService.getStandardList()
    .subscribe(data=>{
      console.log(data);
      this.standards=data;
    },error=>{
      this.handleError(error);
    })
  }

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

  getStudentByFeeStatus()
  {
    console.log("get students by fee status");
     this._getadminservice.getStudentByFeeStatus("unpaid",this.page).subscribe(data=>{
       this.students = data['content'] ; console.log(this.students)
       this.totalPages = data['totalPages'] 
       console.log("total Pages =>"+this.totalPages)
       if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
       else{this.statusNext=false}
       if(this.page==0) {this.statusPre=true; }
       else{this.statusPre=false;}
       this.pages= new Array(data['totalPages'])
      //array mate
       this.noofelements = data['numberOfElements']; console.log("no of elements = "+this.noofelements)
     },error=>{
      this.handleError(error);
    })
  }
  //get selected div
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
   //searchfilter
   getStudentByStdAndDiv(getStudentByStdAndDiv:any)
   {
     console.log("hi students by std and div");
      //jo std select na hoy to
     if(this.selectedstd && this.selecteddiv)
     {
      this.getStdDivService.StudentListByFeeStatusAndStandardAndDivision(this.selectedstd,this.selecteddiv,this.page,).subscribe(data=>
        {
          this.students = data['content']; console.log(data);
          this.totalPages = data['totalPages'] 
          console.log("total Pages =>"+this.totalPages)
          if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
          else{this.statusNext=false}
          if(this.page==0) {this.statusPre=true; }
          else{this.statusPre=false;}
          this.pages= new Array(data['totalPages'])
        
            },error=>{
              this.handleError(error);
            })
           
     }
     else if(this.selectedstd)
     {
      this.getStdDivService.StudentListByFeeStatusAndStandrad(this.selectedstd,this.page,).subscribe(data=>
        {
          this.students = data['content']; console.log(this.students);
          this.totalPages = data['totalPages'] 
          console.log("total Pages =>"+this.totalPages)
          if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
          else{this.statusNext=false}
          if(this.page==0) {this.statusPre=true; }
          else{this.statusPre=false;}
          this.pages= new Array(data['totalPages'])
              
            },error=>{
              this.handleError(error);
            })
     }
     else
     {
        this.router.navigate(['/admin/email']);
     }
   }
   //checkbox data and email
   sendEmail()
   {
    if(this.page!=this.totalPages.valueOf()-1)
    {
      console.log("page = "+this.page);
      this._getadminservice.getStudentByFeeStatus("unpaid",this.page+1).subscribe(data=>{
        this.students = data['content'] ; console.log(this.students)
        this.totalPages = data['totalPages'] 
        console.log("total Pages =>"+this.totalPages)
        if(this.page+1==this.totalPages.valueOf()-1){this.statusNext=true}
        else{this.statusNext=false}
        if(this.page==0) {this.statusPre=true; }
        else{this.statusPre=false;}
        this.pages= new Array(data['totalPages'])
        //array mate
        this.noofelements = data['numberOfElements']; console.log("no of elements = "+this.noofelements)
      },error=>{
        this.handleError(error);
      })
    }
    for(let i=0;i<this.noofelements;i++)
    {
      console.log("i => "+i);
      // console.log("gr no string => "+this.grNoString)
      this._getadminservice.FeePaymentMail(this.students[i].grNo).subscribe(data=>{
        console.log(data);
        this.showSnackbar=true;
      },error=>{
        this.handleError(error);
      }) 
    }
    if(this.snakBar)
    {
      this.snakBar.open("successfully Sended..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
    }
   }

}
