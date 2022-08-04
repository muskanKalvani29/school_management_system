import { Component, OnInit, ViewChild } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {StudyMaterial} from 'src/app/core/model/StudyMaterial';
import {StudyMaterialService} from 'src/app/features/teacher/pages/documents/services/study-material.service';


@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.css']
})
export class ViewDocumentComponent implements OnInit {

  pdfSource:String;
  shows:boolean;
  documentId: number;
  studymaterial:StudyMaterial;
  constructor(private router:Router,
    private route : ActivatedRoute,
    private studyMaterialService:StudyMaterialService) { }

  ngOnInit(): void {

    console.log("oninit");
    this.studymaterial = new StudyMaterial();
    this.documentId = this.route.snapshot.params['document_id'];
    this.studyMaterialService.getStudyMaterial(this.documentId)
    .subscribe(data=>{
      console.log(data);
      this.studymaterial = data;
      this.shows=true;
      this.pdfSource=this.studymaterial.studymaterialFile;
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
   goToDocumentList()
   {
     console.log("go to");
     this.router.navigate(['parent/student/home/document/all-documents']);
   }
}

  

