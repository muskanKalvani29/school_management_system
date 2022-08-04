import { Component, OnInit } from '@angular/core';
import {Parent} from 'src/app/core/model/Parent';
import {ParentServiceService} from 'src/app/features/admin/pages/parent/services/parent-service.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-parent',
  templateUrl: './view-parent.component.html',
  styleUrls: ['./view-parent.component.css']
})

export class ViewParentComponent implements OnInit {

  parentId:number
  parent:Parent

  constructor(private viewParentService:ParentServiceService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void
  {
    this.parent = new Parent();
    this.parentId = this.route.snapshot.params['parentId'];
    this.viewParentService.getParent(this.parentId)
    .subscribe(data=>{
      console.log(data);
      this.parent = data;
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
  //go back to list
  goToParentList()
  {
    console.log("go to list");
    this.router.navigate(['admin/parents/all-parents']);
  }

}
