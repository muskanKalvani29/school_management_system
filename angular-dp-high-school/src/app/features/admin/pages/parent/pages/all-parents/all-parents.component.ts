
import { Component, OnInit } from '@angular/core';
import {Parent} from 'src/app/core/model/Parent';
import {ParentServiceService} from 'src/app/features/admin/pages/parent/services/parent-service.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { Student } from 'src/app/core/model/Student';
 

@Component({
  selector: 'app-all-parents',
  templateUrl: './all-parents.component.html',
  styleUrls: ['./all-parents.component.css']
})
export class AllParentsComponent implements OnInit {

  parents: Array<Parent> = new Array()
  students: Student;
  grNoSearch:number
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  constructor(private getParentsService:ParentServiceService,
    private router : Router) { }

  ngOnInit(): void 
  {
    console.log("oninit"); console.log("page"+this.page)
    this.getParentList();
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
    this.getParentList();
  }
  pre()
  {
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;this.page=this.page.valueOf()-1;
      this.getParentList();}
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
      this.getParentList();}
  }
  //get list
  getParentList()
  {
    console.log("get all parentlist");
    this.getParentsService.getParentList(this.page).subscribe(data=>{
     this.parents = data['content']; console.log(this.parents);
          //items per page mate che..
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


  //view parent
  viewParent(parentId:number)
  {
    console.log("view");
    this.router.navigate(['admin/parents/all-parents/view-parent',parentId]);
  }

  //filter parent
  getParentByGrNo(getParentByGrNo:any)
  {
    console.log("hi");
      this.getParentsService.getParentByGrNo(getParentByGrNo.grNo,this.page).subscribe(data=>{
          this.parents = data['content']; console.log(this.parents);
          //items per page mate che..
          this.totalPages = data['totalPages'] 
          console.log("total Pages =>"+this.totalPages)
          if(this.page==this.totalPages.valueOf()-1){this.statusNext=true}
          else{this.statusNext=false}
          if(this.page==0) {this.statusPre=true; }
          else{this.statusPre=false;}
          this.pages= new Array(data['totalPages'])
        this.router.navigate(['/admin/parents/all-parents']);
      },
      error=>{
        this.handleError(error);
      });
  }
}
