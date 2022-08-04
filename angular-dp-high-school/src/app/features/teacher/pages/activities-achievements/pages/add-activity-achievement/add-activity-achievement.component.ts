import { Component, OnInit } from '@angular/core';
import {Activity} from 'src/app/core/model/Activity';
import {ActivitiesAchievementsService} from 'src/app/features/teacher/pages/activities-achievements/services/activities-achievements.service';
import {Router,ActivatedRoute} from '@angular/router';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import { Student } from 'src/app/core/model/Student';

@Component({
  selector: 'app-add-activity-achievement',
  templateUrl: './add-activity-achievement.component.html',
  styleUrls: ['./add-activity-achievement.component.css']
})
export class AddActivityAchievementComponent implements OnInit {

  actAch:Activity;
  student:Student;
  getGrNo:number;
  constructor(private router : Router,private route:ActivatedRoute, private snakBar:MatSnackBar,
    private AddActAchService:ActivitiesAchievementsService) { }

  ngOnInit(): void 
  {
    this.getGrNo = this.route.snapshot.params['grNo'];
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
  addActAch(addActAch:any)
  {
    this.actAch = new Activity();
    this.actAch.student = new Student();
    this.actAch.student.grNo = this.getGrNo;
    this.actAch.activityName = addActAch.activityName;
    this.actAch.achievementName = addActAch.achievementName;
    this.actAch.achievementDescription = addActAch.achievementDescription;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var today1 = mm + '-' + dd + '-' + yyyy;
    console.log(today1);
    this.actAch.uploadDate = today1; 

    this.AddActAchService.addActivity(this.actAch).subscribe(data=>{
      console.log(data);
      this.snakBar.open("successfully Added..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.router.navigate(['/teacher/activities-achievements/all-students']);
    },error=>{
      this.handleError(error);
    })
  }
}
