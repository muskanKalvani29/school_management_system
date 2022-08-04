import { Component, OnInit } from '@angular/core';
import {Activity} from 'src/app/core/model/Activity';
import {ActivitiesAchievementsService} from 'src/app/features/teacher/pages/activities-achievements/services/activities-achievements.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import {Router,ActivatedRoute} from '@angular/router';
import { Student } from 'src/app/core/model/Student';

@Component({
  selector: 'app-update-activity-achievement',
  templateUrl: './update-activity-achievement.component.html',
  styleUrls: ['./update-activity-achievement.component.css']
})

export class UpdateActivityAchievementComponent implements OnInit {

  actAch:Activity;
  activityId:number;
  grNo:number;
  constructor(private router : Router,
    private route : ActivatedRoute,
    private snakBar:MatSnackBar, private updateActAchService: ActivitiesAchievementsService) { }

    ngOnInit(): void
    {
      this.actAch = new Activity();
      this.activityId = this.route.snapshot.params['activityId'];
      this.updateActAchService.getActivity(this.activityId).subscribe(data=>{
        console.log(data); this.actAch = data; console.log(this.actAch);
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
     //on submit
     onSubmit()
     {
       console.log("form update");
       this.updateActAch();
     }
     updateActAch()
     {
       this.actAch.student = new Student();
       this.grNo = this.updateActAchService.getGrNoForAttendance(); console.log(this.grNo);
       this.actAch.student.grNo = this.grNo;
       this.updateActAchService.updateActivity(this.activityId,this.actAch).subscribe(data=>{
         console.log(data); 
         this.snakBar.open("successfully Updated..","Cancle", {       
           duration : 3000,
           horizontalPosition:'center',
           verticalPosition:"bottom"
         });
         console.log(this.grNo);
         this.router.navigate(['/teacher/activities-achievements/all-students/view',this.grNo]);
       },error=>{
        this.handleError(error);
      })
     }
}
