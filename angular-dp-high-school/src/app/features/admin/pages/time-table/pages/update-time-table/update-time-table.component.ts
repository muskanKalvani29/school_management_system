import { Component, OnInit } from '@angular/core';
import {TimeTable} from 'src/app/core/model/TimeTable';
import {TimeTableServiceService} from 'src/app/features/admin/pages/time-table/service/time-table-service.service';
import {Router,ActivatedRoute} from '@angular/router';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import { FileUpload } from 'src/app/core/model/FileUpload';
import { UploadImageService } from 'src/app/features/admin/services/upload-image.service';
@Component({
  selector: 'app-update-time-table',
  templateUrl: './update-time-table.component.html',
  styleUrls: ['./update-time-table.component.css']
})
export class UpdateTimeTableComponent implements OnInit {

  imageChangedEvent: any = '';
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  image: File;
  url : String;
  selectedFileName: string = "";
  imageURL:string;
  isUpload : boolean=false;

  timetableId : number;
  timetable : TimeTable;
  constructor(private timeTableService : TimeTableServiceService,
              private router : Router,
              private route : ActivatedRoute,private uploadService: UploadImageService,
              private snakBar:MatSnackBar) { }

  ngOnInit(): void 
  {
    this.timetable = new TimeTable();
    this.timetableId = this.route.snapshot.params['timetableId'];
    this.timeTableService.getTimetable(this.timetableId)
    .subscribe(data=>{
      console.log(data);
      this.timetable = data;
      this.url=this.timetable.timetableFile;
      console.log(this.timetable.timetableFile);
    },error=>{
      this.handleError(error);
    });
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
  //update time table
  updateTimeTaable()
  {
    if(this.isUpload==true){
      this.timetable.timetableFile=localStorage.getItem("imageURL");
      localStorage.removeItem("imageURL");
    }
    else{
      this.timetable.timetableFile=this.url;
    }
   
    this.timeTableService.updateTimetable(this.timetableId,this.timetable)
    .subscribe(data=>{
      console.log(data);
      this.timetable = new TimeTable();
      console.log("hi");
      this.snakBar.open("successfully Updated..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.goToTimeTableList();
    },error=>{
      this.handleError(error);
    })
  }

  //onsubmit
  onSubmit()
  {
    console.log("form update");
    this.updateTimeTaable();
  }

  //get back to List
  goToTimeTableList()
  {
    console.log("hi");
    this.router.navigate(['/admin/time-table/all-time-tables']);
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  
  
  selectFile(event): void {
    this.selectedFiles = event.target.files;
    this.selectedFileName = this.selectedFiles.item(0).name
    console.log(this.selectedFiles.item(0).name);
  
  }
  
  upload(): void {
  
    this.percentage=0
    this.isUpload=true;
    this.uploadService.delete(this.url);
    console.log(this.url);
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload,"/timetable_files").subscribe( 
      percentage => {
        this.percentage = Math.round(percentage);
        if (this.percentage === 100) {
            console.log("image upoaded successfully");
          // this.createPost.imageURL = localStorage.getItem("imageURL")
          // console.log(this.createPost.imageURL);
  
        }
      },
      error => {
        console.log(error);
      }
  
    )
  }
}
