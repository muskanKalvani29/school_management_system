import { Component, OnInit } from '@angular/core';
import {Holiday} from 'src/app/core/model/Holiday';
import {HolidayServiceService} from 'src/app/features/admin/pages/holiday/service/holiday-service.service';
import {Router,ActivatedRoute} from '@angular/router'
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar' 
@Component({
  selector: 'app-update-holiday',
  templateUrl: './update-holiday.component.html',
  styleUrls: ['./update-holiday.component.css']
})
export class UpdateHolidayComponent implements OnInit {

  holidayId: number;
  holiday : Holiday;
  getSdate:String;
  getEdate:String;
  constructor(private updateHolidayService : HolidayServiceService,
              private router : Router,
              private route : ActivatedRoute,
              private snakBar:MatSnackBar) { }

  ngOnInit(): void
  {
    this.holiday = new Holiday();
    this.holidayId = this.route.snapshot.params['holidayId'];
    this.updateHolidayService.getHoliday(this.holidayId)
    .subscribe(data=>{
      console.log(data);
      this.holiday = data;
      this.getSdate = this.holiday.holidayStartdate;
      this.getEdate = this.holiday.holidayEnddate;
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
  //update holiday
  updateHoliday()
  {
    if(this.holiday.holidayStartdate != this.getSdate)
    {
    let getMDate:String = this.holiday.holidayStartdate;
    let splitMDate:String[] = getMDate.split("-");
    let concateMDate = splitMDate[1] + "-" + splitMDate[2] + "-" + splitMDate[0];
    this.holiday.holidayStartdate = concateMDate;
    }
    if(this.holiday.holidayEnddate!= this.getEdate){
      let getMDate1:String = this.holiday.holidayEnddate;
    let splitMDate1:String[] = getMDate1.split("-");
    let concateMDate1 = splitMDate1[1] + "-" + splitMDate1[2] + "-" + splitMDate1[0];
    this.holiday.holidayEnddate = concateMDate1;
    }
    this.updateHolidayService.updateHoliday(this.holidayId,this.holiday)
    .subscribe(data=>{
      console.log(data);
      this.holiday = new Holiday();
      console.log("hi");
      this.snakBar.open("successfully Updated..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.goToHolidayList();
    },error=>{
      this.handleError(error);
    })
  }

  //on submit
  onSubmit()
  {
    console.log("onsubmit");
    this.updateHoliday();
  }

  //get back to all holiday list
  goToHolidayList()
  {
    console.log("hi");
    this.router.navigate(['/admin/holiday/all-holidays']);
  }
}
