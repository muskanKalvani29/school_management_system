import { Component, OnInit } from '@angular/core';
import {StudentServiceService} from 'src/app/features/admin/pages/student/service/student-service.service';
import {ParentsMeetingServiceService} from 'src/app/features/teacher/pages/parents-meeting/services/parents-meeting-service.service';
import {StudyMaterialService} from 'src/app/features/teacher/pages/documents/services/study-material.service';
import { AuthenticationService } from 'src/app/app-home/services/authentication.service';
import { CoreService } from 'src/app/app-home/services/core.service';
import { TeacherOwnServiceService } from '../../services/teacher-own-service.service';
import { Teacher } from 'src/app/core/model/Teacher';
import { User } from 'src/app/core/model/User';
import { Router } from '@angular/router';
import {Holiday} from 'src/app/core/model/Holiday';
import {Event} from 'src/app/core/model/Event';
import {Image} from 'src/app/core/model/Image';
import {ActivitiesAchievementsService} from 'src/app/features/admin/pages/upload-activities-achievements/services/activities-achievements.service';
import {HolidayServiceService} from 'src/app/features/admin/pages/holiday/service/holiday-service.service';
import {EventServiceService} from 'src/app/features/admin/pages/event/service/event-service.service';
import {BestStudentServiceService} from 'src/app/features/admin/pages/upload-best-student-detail/services/best-student-service.service';
import { Observable } from 'rxjs';
import { BestStudent } from 'src/app/core/model/BestStudent';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  meeting:number;
  student: number;
  studyMaterial:number;
  teacherId:number;
  teacher:Teacher;
  userId:number
  userobj:User;
  UserName:String

  holidayData:Observable<Holiday[]>
  ActivityData:Observable<Image[]>
  AchievementData:Observable<Image[]>
  eventData:Observable<Event[]>
  bestStudentData:Array<BestStudent> = new Array();
  bestStudent1:BestStudent;
  bestStudent2:BestStudent;
  bestStudent3:BestStudent;

  constructor(private documentService:StudyMaterialService,
              private parentMeetingService:ParentsMeetingServiceService,
              private studentService:StudentServiceService,
              private authService:AuthenticationService,
              private getTecharService:TeacherOwnServiceService,
              private coreService:CoreService,
              private router:Router,
              private getHomeHolidayService:HolidayServiceService,
              private getHomeEventService:EventServiceService,
              private imageService:ActivitiesAchievementsService,
              private bestStudentService:BestStudentServiceService) { }

  ngOnInit(): void {

    let user:string[];
    let username:String;

    user = localStorage.getItem(this.authService.LOCAL_STORAGE_ATTRIBUTE_USERNAME).split(" ");
    username = atob(user[0]);
    //get user
    this.coreService.getUserByUserName(username).subscribe(data=>
      {
        this.userobj = data;
        this.UserName = username;
        this.userId = this.userobj.userId;
        console.log(this.UserName);


        console.log("get-student-count");
        this.documentService.getByStandardAndTeacher(this.userId)
        .subscribe(data=>
          {
            this.studyMaterial=data;
            console.log("studyMaterial count ==> "+this.studyMaterial);
            this.router.navigate(['/teacher/home']);
          },error=>{
            this.handleError(error);
          })

        console.log("get-student-count");
        this.studentService.getStudentByStandardAndTeacher(this.userId)
        .subscribe(data=>
        {
          this.student=data;
          console.log("student count ==> "+this.student);
          this.router.navigate(['/teacher/home']);
        },error=>{
          this.handleError(error);
        })

        console.log("get-student-count");
        this.parentMeetingService.getMeetingByStandardAndTeacher(this.userId)
        .subscribe(data=>
          {
            this.meeting=data;
            console.log("meeting count ==> "+this.meeting);
            this.router.navigate(['/teacher/home']);
          },error=>{
            this.handleError(error);
          })   
      },error=>{
        this.handleError(error);
      })
    
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
    // if(error==404)
    // {
    //   console.log("hi")
    //   this.router.navigate(['/page-not-found']);
    // }
    // else if(error==500)
    // {
    //   console.log("hi")
    //   this.router.navigate(['/internal-server-error']);
    // }
    // else
    // {
    //   console.log("hi")
    //   this.router.navigate(['/error-page']);
    // }
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



