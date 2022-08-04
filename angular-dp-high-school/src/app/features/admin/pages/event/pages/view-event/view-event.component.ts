import { Component, OnInit } from '@angular/core';
import {Event} from 'src/app/core/model/Event';
import {EventServiceService} from 'src/app/features/admin/pages/event/service/event-service.service';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {

  eventId : number
  event : Event
  constructor(private viewEventService:EventServiceService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.event = new Event();
    this.eventId = this.route.snapshot.params['eventId'];
    this.viewEventService.getEventById(this.eventId)
    .subscribe(data=>{
      console.log(data);
      this.event = data;
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
  goToEventList()
  {
    console.log("goto");
    this.router.navigate(['admin/event/all-events']);
  }
}
