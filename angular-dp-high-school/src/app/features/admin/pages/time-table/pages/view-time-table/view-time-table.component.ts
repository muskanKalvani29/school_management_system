import { Component, OnInit, ViewChild } from '@angular/core';
import {TimeTable} from 'src/app/core/model/TimeTable';
import {TimeTableServiceService} from 'src/app/features/admin/pages/time-table/service/time-table-service.service';
import {Router,ActivatedRoute} from '@angular/router';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-view-time-table',
  templateUrl: './view-time-table.component.html',
  styleUrls: ['./view-time-table.component.css']
})
export class ViewTimeTableComponent implements OnInit {

  timetableId : number
  timetable : TimeTable
  shows: boolean;
  pdfSource: String;
  constructor(private viewTimeTableService:TimeTableServiceService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void 
  {
    console.log("oninit");
    this.timetable = new TimeTable();
    this.timetableId = this.route.snapshot.params['timetableId'];
    this.viewTimeTableService.getTimetable(this.timetableId)
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
    console.log("goto");
    this.router.navigate(['admin/time-table/all-time-tables']);
  }


  
}
