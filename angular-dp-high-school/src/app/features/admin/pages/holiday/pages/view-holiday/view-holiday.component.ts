import { Component, OnInit } from '@angular/core';
import {Holiday} from 'src/app/core/model/Holiday';
import {HolidayServiceService} from 'src/app/features/admin/pages/holiday/service/holiday-service.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-holiday',
  templateUrl: './view-holiday.component.html',
  styleUrls: ['./view-holiday.component.css']
})
export class ViewHolidayComponent implements OnInit {

  holidayId:number
  holiday:Holiday
  constructor(private viewHolidayService:HolidayServiceService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.holiday = new Holiday();
    this.holidayId = this.route.snapshot.params['holidayId'];
    this.viewHolidayService.getHoliday(this.holidayId)
    .subscribe(data=>{
      console.log(data);
      this.holiday = data;
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
  goToHolidayList()
  {
    console.log("go to list");
    this.router.navigate(['admin/holiday/all-holidays']);
  }
}
