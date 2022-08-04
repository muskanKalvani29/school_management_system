import { Component, OnInit } from '@angular/core';
import {Event} from 'src/app/core/model/Event';
import {EventServiceService} from 'src/app/features/admin/pages/event/service/event-service.service';
import {Router,ActivatedRoute} from '@angular/router'
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  constructor(private eventService:EventServiceService,
    private router:Router,
    private snakBar:MatSnackBar) { }
  event : Event = new Event();
 
  concatStartdate:String="";
  ngOnInit(): void {
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

  addEvent(addEvent:any)
  {
    this.event = new Event();
    this.event.eventName = addEvent.eventName;
    let  getEventStartDate:String = addEvent.eventStartdate
    let splitStartDate:String[] = getEventStartDate.split("-");
    let concatStartDate = splitStartDate[1] + "-" + splitStartDate[2] + "-" + splitStartDate[0];
    this.event.eventStartdate = concatStartDate;
    let getEventEndDate:String = addEvent.eventEnddate;
    let splitEndDate:String[] = getEventEndDate.split("-");
    let concatEndDate = splitEndDate[1] + "-" + splitEndDate[2] + "-" + splitEndDate[0];
    this.event.eventEnddate = concatEndDate;
    this.event.eventStarttime = addEvent.eventStarttime;
    // this.event.eventStarttime+=":00";
    console.log(this.event.eventStarttime);
    this.event.eventEndtime = addEvent.eventEndtime;
    // this.event.eventEndtime+=":00";
    console.log(this.event.eventEndtime);
    this.event.eventDescription = addEvent.eventDescription;
    //add event
    this.eventService.addEvent(this.event)
    .subscribe(data=>{
      console.log(data);
      this.snakBar.open("successfully Added..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.router.navigate(['/admin/event/all-events']);
    },error=>{
      this.handleError(error);
    });
  }
}
