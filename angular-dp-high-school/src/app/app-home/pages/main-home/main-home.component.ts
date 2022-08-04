import { Component, OnInit , Inject , ViewEncapsulation} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {Event} from 'src/app/core/model/Event';
import {Image} from 'src/app/core/model/Image';
import {ActivitiesAchievementsService} from 'src/app/features/admin/pages/upload-activities-achievements/services/activities-achievements.service';
import {EventServiceService} from 'src/app/features/admin/pages/event/service/event-service.service';
import {BestStudentServiceService} from 'src/app/features/admin/pages/upload-best-student-detail/services/best-student-service.service';
import { Observable } from 'rxjs';
import { BestStudent } from 'src/app/core/model/BestStudent';
import {SchooldetailServiceService} from 'src/app/features/admin/services/schooldetail-service.service';
import { SchoolDetail } from 'src/app/core/model/SchoolDetail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css',
              '../../../../assets/css/font-awesome.min.css',
              '../../../../assets/css/animate.css',
              '../../../../assets/css/owl.carousel.css',
              '../../../../assets/css/off-canvas.css',
              '../../../../assets/css/rsmenu-main.css',
              '../../../../assets/css/style1.css',
              '../../../../assets/css/responsive.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainHomeComponent implements OnInit {

  ActivityData:Array<Image> = new Array();
  AchievementData:Array<Image> = new Array();
  eventData:Array<Event> = new Array();
  bestStudentData:Array<BestStudent> = new Array();
  bestStudent1:BestStudent;
  bestStudent2:BestStudent;
  bestStudent3:BestStudent;
  Achievement1:Image;
  Achievement2:Image;
  Achievement3:Image;
  event1:Event;
  event2:Event;
  event3:Event;
  event4:Event;
  Activity1:Image;
  Activity2:Image;
  Activity3:Image;
  Activity4:Image;
  Activity5:Image;
  Schooldetail:SchoolDetail
  Achievement4: Image;
  Achievement5: Image;
  Achievement6: Image;

  constructor(private schooldetailService:SchooldetailServiceService,
              private getHomeEventService:EventServiceService,
              private imageService:ActivitiesAchievementsService,
              private bestStudentService:BestStudentServiceService,private router:Router,
              @Inject(DOCUMENT) private document: Document) {}
  

  ngOnInit(): void 
  {

    this.loadScript("../../../../assets/JS/modernizr-3.6.0.min.js");
    this.loadScript("../../../../assets/JS/jquery-3.5.1.js");
    this.loadScript("../../../assets/JS/bootstrap.min.js");
    this.loadScript("../../../../assets/JS/jquery-3.5.1.js");
    this.loadScript("../../../../assets/JS/rsmenu-main.js");
    this.loadScript("../../../assets/JS/owl.carousel.min.js")
    this.loadScript("../../../../assets/JS/isotope.pkgd.min.js");
    this.loadScript("../../../../assets/JS/wow.min.js");
    this.loadScript("../../../../assets/JS/jquery.counterup.min.js");
    this.loadScript("../../../../assets/JS/jquery.waypoints.min.js");
    this.loadScript("../../../../assets/JS/jquery.magnific-popup.min.js");
    this.loadScript("../../../../assets/JS/plugins.js");
    this.loadScript("../../../../assets/JS/contact.form.js");
    this.loadScript("../../../../assets/JS/main2.js");

      this.getSchoolDetails();
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

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  getSchoolDetails(){
    this.schooldetailService.getSchoolDetailList().subscribe(data=>{
      this.Schooldetail =data;
    },error=>{
      this.handleError(error);
    })
  }

  getEventHome()
  {
    this.getHomeEventService.getEventByNameForHome().subscribe(data=>{
      this.eventData =data;
      console.log("data")
      this.event1=this.eventData[0];
      this.event2=this.eventData[1];
      this.event3=this.eventData[2];
      this.event4=this.eventData[3];
   },error=>{
    this.handleError(error);
  })
    console.log(this.AchievementData);
  }
  

  getActivityImages()
  {
    console.log("event for home");
    this.imageService.getImageByActivity().subscribe(data=>{
      this.ActivityData = data;
      this.Activity1=this.ActivityData[0];
      this.Activity2=this.ActivityData[1];
      this.Activity3=this.ActivityData[2];
      this.Activity4=this.ActivityData[3];
      this.Activity5=this.ActivityData[4];

    },error=>{
      this.handleError(error);
    })
    console.log(this.ActivityData);
  }

  getAchievementImages()
  {
    console.log("event for home");
    this.imageService.getImageByAchievement().subscribe(data=>{
      this.AchievementData=data;
      console.log("data")
      this.Achievement1=this.AchievementData[0];
      this.Achievement2=this.AchievementData[1];
      this.Achievement3=this.AchievementData[2];
      this.Achievement4=this.AchievementData[3];
      this.Achievement5=this.AchievementData[4];
      this.Achievement6=this.AchievementData[5];
   },error=>{
    this.handleError(error);
  })
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
