import { Component, OnInit } from '@angular/core';
import {Image} from 'src/app/core/model/Image';
import {ActivitiesAchievementsService} from 'src/app/features/admin/pages/upload-activities-achievements/services/activities-achievements.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { UploadImageService } from 'src/app/features/admin/services/upload-image.service';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog';
import {DialogBoxComponent} from 'src/app/features/DialogBox/dialog-box/dialog-box.component';
@Component({
  selector: 'app-get-all-activities-achivements',
  templateUrl: './get-all-activities-achivements.component.html',
  styleUrls: ['./get-all-activities-achivements.component.css']
})
export class GetAllActivitiesAchivementsComponent implements OnInit {

  images:Array<Image> = new Array()
  imageData:Image=new Image();
  nameSearch:String=""
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  constructor(private getActAchImagesService : ActivitiesAchievementsService,
              private router : Router,private deleteimageService: UploadImageService,
              private snakBar:MatSnackBar,private dialog:MatDialog) { }

  ngOnInit(): void 
  {
    console.log("on init");
    console.log("page"+this.page)
    this.getActAchImageList();
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
  setPage(i,event:any)
  {
    this.page=i;
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;}
    if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false}
    this.getActAchImageList();
  }
  pre()
  {
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;this.page=this.page.valueOf()-1;
      this.getActAchImageList();}
    if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false}
  }
  next()
  {
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;}
    console.log("page"+this.page)
     if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
    else{this.statusNext=false; this.page=this.page.valueOf()+1;
      this.getActAchImageList();}
  }
  getActAchImageList()
  {
    console.log("get act-ach list");
    this.getActAchImagesService.getImageList(this.page).subscribe(data=>
    {
      this.images = data['content']; console.log(this.images)
      this.totalPages = data['totalPages'] 
       console.log("total Pages =>"+this.totalPages)
       if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
       else{this.statusNext=false}
       if(this.page==0) {this.statusPre=true; }
       else{this.statusPre=false;}
       this.pages= new Array(data['totalPages'])
    },error=>{
      this.handleError(error);
    })
  }
  updateActAch(imageId:number)
  {
    console.log("update");
    this.router.navigate(['admin/dashboard/activities-achivements/all-activities-achivements/update',imageId]);
  }
  viewActAch(imageId:number)
  {
    console.log("view");
    this.router.navigate(['admin/dashboard/activities-achivements/all-activities-achivements/view',imageId]);
  }
  deleteActAch(imageId:number)
  {
    console.log("delete");
     this.dialog.open(DialogBoxComponent).afterClosed().subscribe(data=>{
      console.log(data.delete)
      if(data.delete)
      {
          this.imageData = new Image();
          
          this.getActAchImagesService.getImage(imageId)
          .subscribe(data=>{
            console.log(data);
            this.imageData = data;
            console.log(this.imageData.imagePath);
            this.deleteimageService.delete(this.imageData.imagePath);
          },error=>{
            this.handleError(error);
          })

          console.log("delete");
          this.getActAchImagesService.deleteImage(imageId)
          .subscribe(data=>{
            console.log(data);
            //navigate to list
            // this.getActAchImageList();
            this.router.navigate(['/admin/dashboard']);
            this.snakBar.open("successfully Deleted..","Cancle", {       
              duration : 3000,
              horizontalPosition:'center',
              verticalPosition:"bottom"
            });
          },error=>{
            this.handleError(error);
          });
        }

      },error=>{
        this.handleError(error);
      })
     }
  }

