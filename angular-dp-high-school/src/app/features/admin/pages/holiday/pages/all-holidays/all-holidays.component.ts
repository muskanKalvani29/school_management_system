import { Component, OnInit } from '@angular/core';
import {Holiday} from 'src/app/core/model/Holiday';
import {HolidayServiceService} from 'src/app/features/admin/pages/holiday/service/holiday-service.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/features/DialogBox/dialog-box/dialog-box.component';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-holidays',
  templateUrl: './all-holidays.component.html',
  styleUrls: ['./all-holidays.component.css']
})
export class AllHolidaysComponent implements OnInit {

  // holidayId : number
  holidays : Array<Holiday> = new Array()
  nameSearch:String=""
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  constructor(private getHolidaysService:HolidayServiceService,
              private router : Router,private dialog:MatDialog,private snakBar:MatSnackBar) { }

  ngOnInit(): void 
  {
    console.log("oninit");  console.log("page"+this.page)
    this.getHolidayList();
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
    this.getHolidayList();
  }
  pre()
  {
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;this.page=this.page.valueOf()-1;
      this.getHolidayList();}
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
      this.getHolidayList();}
  }
  //get holiday list
  getHolidayList()
  {
    console.log("get all holiday list");
    this.getHolidaysService.getHolidayList(this.page).subscribe(data=>{
      this.holidays = data['content']; console.log(this.holidays);
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
    // console.log(this.holidays);
  }

  //update holiday call
  updateHoliday(holidayId:number)
  {
    console.log("update");
    this.router.navigate(['all-holidays/update-holiday',holidayId]);
  }

  //delete holiday
  deleteHoliday(holidayId:number)
  {
    console.log("delete");
    this.dialog.open(DialogBoxComponent).afterClosed().subscribe(data=>{
      console.log(data.delete)
   if(data.delete)
   { 
        console.log("delete");
        this.getHolidaysService.deleteHoliday(holidayId)
        .subscribe(data=>{
          console.log(data);
          this.snakBar.open("successfully Deleted..","Cancle", {       
            duration : 3000,
            horizontalPosition:'center',
            verticalPosition:"bottom"
          });
          this.router.navigate(['/admin/dashboard']);
            //navigate to list
            // this.getHolidayList();
        },error=>{
          this.handleError(error);
        })
      }
    },error=>{
      this.handleError(error);
    })
  }

  //view holiday call
  viewHoliday(holidayId:number)
  {
    console.log("view");
    this.router.navigate(['admin/holiday/all-holidays/view-holiday',holidayId]);
  }

  //update holiday call
  updateHolidayRoute(holidayId:number)
  {
    console.log("update");
    this.router.navigate(['admin/holiday/all-holidays/update-holiday',holidayId]);
  }
}
