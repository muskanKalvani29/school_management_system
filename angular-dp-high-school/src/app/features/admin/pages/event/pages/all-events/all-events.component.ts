import { Component, OnInit } from '@angular/core';
import {Event} from 'src/app/core/model/Event';
import {EventServiceService} from 'src/app/features/admin/pages/event/service/event-service.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/features/DialogBox/dialog-box/dialog-box.component';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {

  events : Array<Event> = new Array()
  nameSearch:String=""
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  // eventId : number
  constructor(private getEventsService:EventServiceService,
              private router : Router,private dialog:MatDialog,private snakBar:MatSnackBar) { }

  //load list data
  ngOnInit(): void 
  {
    console.log("on init"); console.log("page"+this.page)
    this.getEventList();
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
    this.getEventList();
  }
  pre()
  {
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;this.page=this.page.valueOf()-1;
      this.getEventList();}
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
      this.getEventList();}
  }
  //get event list
  getEventList()
  {
    console.log("get all event list");
     this.getEventsService.getEventList(this.page).subscribe(data=>{
       this.events = data['content']; console.log(this.events)
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

  //delete event
  deleteEvent(eventId:number)
  {
    console.log("delete");
    this.dialog.open(DialogBoxComponent).afterClosed().subscribe(data=>{
      console.log(data.delete)
  
        if(data.delete)
        { 
            console.log("delete");
            this.getEventsService.deleteEvent(eventId)
            .subscribe(data=>{
              console.log(data);
              this.snakBar.open("successfully Deleted..","Cancle", {       
                duration : 3000,
                horizontalPosition:'center',
                verticalPosition:"bottom"
              });
              //navigate to list
            this.router.navigate(['/admin/dashboard']);
            },error=>{
              this.handleError(error);
            });
          }
        },error=>{
          this.handleError(error);
        })
      }
  //update event to navigate
  updateEvent(eventId:number)
  {
    console.log("update");
    this.router.navigate(['admin/event/all-events/update-event',eventId]);
  }

  //view event to navigate
  viewEvent(eventId:number)
  {
    console.log("view");
    this.router.navigate(['admin/event/all-events/view-event',eventId]);
  }
}
