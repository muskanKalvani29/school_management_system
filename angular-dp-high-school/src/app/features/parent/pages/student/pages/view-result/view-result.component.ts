import { Component, OnInit, ViewChild } from '@angular/core';
import {ResultFile} from 'src/app/core/model/ResultFile';
import {ResultService} from 'src/app/features/teacher/pages/results/services/result.service'; 
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {

  pdfSource:String;
  shows:boolean;
  resultFileId: number;
  resultfile:ResultFile;
  constructor(private router:Router,
    private route : ActivatedRoute,
    private resultService:ResultService) { }

  ngOnInit(): void {

    console.log("oninit");
    this.resultfile = new ResultFile();
    this.resultFileId = this.route.snapshot.params['resultfile_id'];
    this.resultService.getResultFile(this.resultFileId)
    .subscribe(data=>{
      console.log(data);
      this.resultfile = data;
      this.shows=true;
      this.pdfSource=this.resultfile.resultFile;
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
 
   goToAllResult()
   {
     console.log("go to");
     this.router.navigate(['parent/student/home/result/all-results']);
   }
}

  

  









