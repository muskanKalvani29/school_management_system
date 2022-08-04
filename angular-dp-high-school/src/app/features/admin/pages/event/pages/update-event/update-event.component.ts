import { Component, OnInit } from '@angular/core';
import {Event} from 'src/app/core/model/Event';
import {EventServiceService} from 'src/app/features/admin/pages/event/service/event-service.service';
import {Router,ActivatedRoute} from '@angular/router';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  eventId : number ;
  event : Event ;
  geteventsdate:String;
  geteventedate:String;
  constructor(private updateEventService: EventServiceService,
              private router : Router,
              private route : ActivatedRoute,private snakBar:MatSnackBar) { }

  ngOnInit(): void 
  {
    this.event = new Event();
    this.eventId = this.route.snapshot.params['eventId'];
    this.updateEventService.getEventById(this.eventId)
    .subscribe(data=>{
      console.log(data);
      this.event=data;
      this.geteventsdate = this.event.eventStartdate;
      this.geteventedate = this.event.eventEnddate;
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
  //update event
  updateEvent()
  {
    // this.event.eventStarttime += ":00";
    // this.event.eventEndtime+=":00";
   if(this.event.eventStartdate != this.geteventsdate)
   {
    let getMDate:String = this.event.eventStartdate;
    let splitMDate:String[] = getMDate.split("-");
    let concateMDate = splitMDate[1] + "-" + splitMDate[2] + "-" + splitMDate[0];
    this.event.eventStartdate = concateMDate;
   }
   if(this.event.eventEnddate!= this.geteventedate){
    let getMDate1:String = this.event.eventEnddate;
    let splitMDate1:String[] = getMDate1.split("-");
    let concateMDate1 = splitMDate1[1] + "-" + splitMDate1[2] + "-" + splitMDate1[0];
    this.event.eventEnddate = concateMDate1;
   }
    this.updateEventService.updateEvent(this.eventId,this.event)
    .subscribe(data=>{
      console.log(data);
      console.log("hi");
      this.snakBar.open("successfully Updated..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.event = new Event();
      this.goToEventList();
    },error=>{
      this.handleError(error);
    })
  }

  onSubmit()
  {
    console.log("form update");
    this.updateEvent();
  }

  //go to all events
  goToEventList()
  {
    console.log("hi");
    this.router.navigate(['admin/event/all-events']);
  }
}
