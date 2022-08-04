import { Component, OnInit } from '@angular/core';
import {TimeTable} from 'src/app/core/model/TimeTable';
import {TimeTableServiceService} from 'src/app/features/admin/pages/time-table/service/time-table-service.service';
import {StandardDivisionService} from 'src/app/features/admin/services/standard-division.service';
import {Standard} from 'src/app/core/model/Standard';
import {Division} from 'src/app/core/model/Division';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { UploadImageService } from 'src/app/features/admin/services/upload-image.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/features/DialogBox/dialog-box/dialog-box.component';
@Component({
  selector: 'app-all-timetables',
  templateUrl: './all-timetables.component.html',
  styleUrls: ['./all-timetables.component.css']
})
export class AllTimetablesComponent implements OnInit {

  timetables : Array<TimeTable> = new Array()
  //dropdown
  standards:Standard[];
  divisions:Division[];
  selectedstd:any;
  selecteddiv:any;
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  timetableData: TimeTable;
  constructor(private getTimeTableService:TimeTableServiceService,
              private getStdDivService:StandardDivisionService,
              private router : Router,private deleteimageService: UploadImageService,
              private snakBar:MatSnackBar,private dialog:MatDialog) { }

  //load list data
  ngOnInit(): void 
  {
    console.log("oninit");
    console.log("page"+this.page)
    this.getTimeTableList();
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
    this.getTimeTableList();
  }
  pre()
  {
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;this.page=this.page.valueOf()-1;
      this.getTimeTableList();}
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
      this.getTimeTableList();}
  }
  //get standards
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

  //get time-table list
  getTimeTableList()
  {
    console.log("get all time-table list");
    //temporary i have passed page no 0
     this.getTimeTableService.getTimetableList(this.page).subscribe(data=>{
       this.timetables = data['content']  ; console.log(this.timetables);
          //items per page mate che..
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

  //delete time-table
  deleteEvent(timetableId:number)
  {
    console.log("delete");
    this.dialog.open(DialogBoxComponent).afterClosed().subscribe(data=>{
      console.log(data.delete)
    if(data.delete)
    { 
        this.timetableData = new TimeTable();
        
        this.getTimeTableService.getTimetable(timetableId)
        .subscribe(data=>{
          console.log(data);
          this.timetableData = data;
          console.log(this.timetableData.timetableFile);
          this.deleteimageService.delete(this.timetableData.timetableFile);
        },error=>{
          this.handleError(error);
        })

        console.log("delete");
        this.getTimeTableService.deleteTimetable(timetableId)
        .subscribe(data=>{
          console.log(data);
          this.snakBar.open("successfully Deleted..","Cancle", {       
            duration : 3000,
            horizontalPosition:'center',
            verticalPosition:"bottom"
          });
          this.router.navigate(['/admin/dashboard']);
          //navigate to list
        },error=>{
          this.handleError(error);
        });
      }
    },error=>{
      this.handleError(error);
    })
  }

  //update time-table to navigate
  updateEvent(timetableId:number)
  {
    console.log("update");
    this.router.navigate(['admin/time-table/all-time-tables/update-time-table',timetableId]);
  }

  //view time-table to navigate
  viewEvent(timetableId:number)
  {
    console.log("view");
    this.router.navigate(['admin/time-table/all-time-tables/view-time-table',timetableId]);
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
   getTimeTablesByStdAndDiv(getStudentByStdAndDiv:any)
   {
     console.log("hi students by std and div");
      //jo std select na hoy to
     if(this.selectedstd && this.selecteddiv)
     {
        this.getTimeTableService.getTimetableByStandardAndDivision(this.selectedstd,this.selecteddiv,this.page).subscribe(data=>{
          this.timetables = data['content'] ; console.log(this.timetables);
            //items per page mate che..
            this.totalPages = data['totalPages'] 
            console.log("total Pages =>"+this.totalPages)
            if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
            else{this.statusNext=false}
            if(this.page==0) {this.statusPre=true; }
            else{this.statusPre=false;}
            this.pages= new Array(data['totalPages'])
            this.router.navigate(['/admin/time-table/all-time-tables']);
        },error=>{
          this.handleError(error);
        })
     }
     else if(this.selectedstd)
     {
        this.getTimeTableService.getTimetableByStandard(this.selectedstd,0).subscribe(data=>{
          this.timetables = data['content'] ; console.log(this.timetables);
            //items per page mate che..
            this.totalPages = data['totalPages'] 
            console.log("total Pages =>"+this.totalPages)
            if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
            else{this.statusNext=false}
            if(this.page==0) {this.statusPre=true; }
            else{this.statusPre=false;}
            this.pages= new Array(data['totalPages'])
            this.router.navigate(['/admin/time-table/all-time-tables']);
        },error=>{
          this.handleError(error);
        })
     }
     else
     {
       console.log("nothing");
       this.router.navigate(['/admin/time-table/all-time-tables']);
     }
   }
}
