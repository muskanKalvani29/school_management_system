import { Component, OnInit, ViewChild } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {TimeTable} from 'src/app/core/model/TimeTable';
import {TimeTableServiceService} from 'src/app/features/admin/pages/time-table/service/time-table-service.service'; 

@Component({
  selector: 'app-view-timetable',
  templateUrl: './view-timetable.component.html',
  styleUrls: ['./view-timetable.component.css']
})
export class ViewTimetableComponent implements OnInit {

  pdfSource:String;
  shows:boolean;
  timetableId: number;
  timetable:TimeTable;
  constructor(private router:Router,
    private route : ActivatedRoute,
    private timetableService:TimeTableServiceService) { }

  ngOnInit(): void {

    console.log("oninit");
    this.timetable = new TimeTable();
    this.timetableId = this.route.snapshot.params['timetable_id'];
    this.timetableService.getTimetable(this.timetableId)
    .subscribe(data=>{
      console.log(data);
      this.timetable = data;
      this.shows=true;
      this.pdfSource=this.timetable.timetableFile;
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

  goToTimeTableList()
  {
    console.log("Go to");
    this.router.navigate(['parent/student/home/time-table/all-time-tables']);
  }
}





