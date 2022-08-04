import { Component, OnInit } from '@angular/core';
import {Holiday} from 'src/app/core/model/Holiday';
import {Event} from 'src/app/core/model/Event';
import {Image} from 'src/app/core/model/Image';
import {ActivitiesAchievementsService} from 'src/app/features/admin/pages/upload-activities-achievements/services/activities-achievements.service';
import {HolidayServiceService} from 'src/app/features/admin/pages/holiday/service/holiday-service.service';
import {EventServiceService} from 'src/app/features/admin/pages/event/service/event-service.service';
import {BestStudentServiceService} from 'src/app/features/admin/pages/upload-best-student-detail/services/best-student-service.service';
import { Observable } from 'rxjs';
import { BestStudent } from 'src/app/core/model/BestStudent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent-dashboard',
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.css']
})
export class ParentDashboardComponent implements OnInit {

  holidayData:Observable<Holiday[]>
  ActivityData:Observable<Image[]>
  AchievementData:Observable<Image[]>
  eventData:Observable<Event[]>
  bestStudentData:Array<BestStudent> = new Array();
  bestStudent1:BestStudent;
  bestStudent2:BestStudent;
  bestStudent3:BestStudent;
  constructor(
              private getHomeHolidayService:HolidayServiceService,
              private getHomeEventService:EventServiceService,
              private imageService:ActivitiesAchievementsService,
              private bestStudentService:BestStudentServiceService,private router:Router) {}
 

  ngOnInit(): void {
    this.getHolidayForHome();
    this.getEventHome();
    this.getActivityImages();
    this.getAchievementImages();
    this.bestStudentImages();
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
  getHolidayForHome()
  {
    console.log("holiday for home");
    this.holidayData = this.getHomeHolidayService.getHolidayByNameForHome();
    console.log(this.holidayData);
  }//event for dashboard

  getEventHome()
  {
    console.log("event for home");
    this.eventData = this.getHomeEventService.getEventByNameForHome();
    console.log(this.eventData);
  }

  getActivityImages()
  {
    console.log("event for home");
    this.ActivityData= this.imageService.getImageByActivity();
    console.log(this.ActivityData);
  }

  getAchievementImages()
  {
    console.log("event for home");
    this.AchievementData= this.imageService.getImageByAchievement();
    console.log(this.AchievementData);
  }

  bestStudentImages()
  {
    let i=0;
    console.log("event for home");
     this.bestStudentService.getBestStudentHome().subscribe(data=>{
        this.bestStudentData=data;
        console.log("data")
        console.log(this.bestStudentData[0]);
        this.bestStudent1=this.bestStudentData[0];
        this.bestStudent2=this.bestStudentData[1];
        this.bestStudent3=this.bestStudentData[2];
     },error=>{
      this.handleError(error);
    })
    }
  }


