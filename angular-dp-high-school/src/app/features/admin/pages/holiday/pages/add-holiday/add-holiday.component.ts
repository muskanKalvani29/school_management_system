import { Component, OnInit } from '@angular/core';
import {Holiday} from 'src/app/core/model/Holiday';
import {HolidayServiceService} from 'src/app/features/admin/pages/holiday/service/holiday-service.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import {Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.css']
})
export class AddHolidayComponent implements OnInit {

  constructor(private holidayService:HolidayServiceService,
    private snakBar:MatSnackBar,
    private router:Router,) { }
  holiday : Holiday = new Holiday();

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
  addHoliday(addHoliday:any)
  {
    this.holiday = new Holiday();
    this.holiday.holidayName = addHoliday.holidayName;
    let getHolidayStartDate:String = addHoliday.holidayStartdate;
    let splitStartDate:String[] = getHolidayStartDate.split("-");
    let concatStartDate = splitStartDate[1] + "-" + splitStartDate[2] + "-" + splitStartDate[0];
    this.holiday.holidayStartdate = concatStartDate;
    let  getHolidayEndDate:String = addHoliday.holidayEnddate
    let splitEndDate:String[] = getHolidayEndDate.split("-");
    let concatEndDate = splitEndDate[1] + "-" + splitEndDate[2] + "-" + splitEndDate[0];
    this.holiday.holidayEnddate = concatEndDate;
    this.holiday.holidayDescription = addHoliday.holidayDescription;

    //call service
    this.holidayService.addHoliday(this.holiday)
    .subscribe(data=>{console.log(data)
      this.snakBar.open("successfully Added..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.router.navigate(['/admin/holiday/all-holidays']);
    },error=>{
      this.handleError(error);
    });
  }
}
