import { Component, OnInit } from '@angular/core';
import {Image} from 'src/app/core/model/Image';
import {ActivitiesAchievementsService} from 'src/app/features/admin/pages/upload-activities-achievements/services/activities-achievements.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-activities-achievements-detail',
  templateUrl: './view-activities-achievements-detail.component.html',
  styleUrls: ['./view-activities-achievements-detail.component.css']
})
export class ViewActivitiesAchievementsDetailComponent implements OnInit {

  imageId: number;
  imageData : Image;
  constructor(private viewActAchService:ActivitiesAchievementsService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void 
  {
    console.log("oninit");
    this.imageData = new Image();
    this.imageId = this.route.snapshot.params['imageId'];
    this.viewActAchService.getImage(this.imageId)
    .subscribe(data=>{
      console.log(data);
      this.imageData = data;
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
  goToActAchList()
  {
    console.log("goto");
    this.router.navigate(['admin/dashboard/activities-achivements/all-activities-achivements']);
  }
}
