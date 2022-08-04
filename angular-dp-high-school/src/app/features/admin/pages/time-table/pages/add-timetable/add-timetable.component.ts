import { Component, OnInit } from '@angular/core';
import {TimeTable} from 'src/app/core/model/TimeTable';
import {TimeTableServiceService} from 'src/app/features/admin/pages/time-table/service/time-table-service.service';
import {StandardDivisionService} from 'src/app/features/admin/services/standard-division.service';
import {Standard} from 'src/app/core/model/Standard';
import {Division} from 'src/app/core/model/Division';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
import { FileUpload } from 'src/app/core/model/FileUpload';
import { UploadImageService } from 'src/app/features/admin/services/upload-image.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-timetable',
  templateUrl: './add-timetable.component.html',
  styleUrls: ['./add-timetable.component.css']
})
export class AddTimetableComponent implements OnInit {

  //image
  imageChangedEvent: any = '';
  selectedFileName: string = "";
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  baseUrl:String;
  imageURL:string;
  timetable : TimeTable = new TimeTable();
  division_id:number;
  standard:Standard
  division:Division
  //dropdown
  standards:Standard[];
  divisions:Division[];
  constructor(private timetableService:TimeTableServiceService,
              private getStdDivService:StandardDivisionService,
              private uploadService: UploadImageService,
              private router : Router,
              private snakBar:MatSnackBar) { }


  ngOnInit(): void 
  {
    this.getStandardList();
    this.getDivisionList();
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
  //get standard 
  getStandardList()
  {
    console.log("Stanadard list");
    this.getStdDivService.getStandardList()
    .subscribe(data=>{
      console.log(data);
      this.standards=data;
    },error=>{
      this.handleError(error);
    })
  }
  //get division
  getDivisionList()
  {
    console.log("Division list");
    this.getStdDivService.getDivisionList()
    .subscribe(data=>{
      console.log(data);
      this.divisions=data;
    },error=>{
      this.handleError(error);
    })
  }

  addTimeTable(addTimeTable:any)
  {
    this.timetable = new TimeTable();
    this.timetable.standard = new Standard();
    this.timetable.division = new Division();
    this.timetable.standard.standardName = addTimeTable.standard;
    this.timetable.name = addTimeTable.name;
    if(addTimeTable.division=="rose"){
      this.division_id=1;
    }
    else if(addTimeTable.division=="lotus"){
      this.division_id=3;
    }
    else {
      this.division_id=2;
    }
    this.timetable.division.divisionId = this.division_id;
    this.imageURL = localStorage.getItem("imageURL");
    console.log(this.imageURL);
    localStorage.removeItem("imageURL");
    this.timetable.timetableFile = this.imageURL;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var today1 = mm + '-' + dd + '-' + yyyy;
    console.log(today1);
    this.timetable.uploadDate = today1;     

    //call service
    this.timetableService.addTimetable(this.timetable)
    .subscribe(data=>{console.log(data)
      this.snakBar.open("successfully Added..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.router.navigate(['/admin/time-table/all-time-tables']);
    },error=>{
      this.handleError(error);
    });
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
  // alert("Radhe Radhe")
  //setting image whether cropped or not
  const file =  this.selectedFiles.item(0);
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
