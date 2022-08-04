import { Component, OnInit } from '@angular/core';
import {Query} from 'src/app/core/model/Query';
import {QueryServiceService} from 'src/app/features/admin/pages/query/service/query-service.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/features/DialogBox/dialog-box/dialog-box.component';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';
@Component({
  selector: 'app-all-queries',
  templateUrl: './all-queries.component.html',
  styleUrls: ['./all-queries.component.css']
})
export class AllQueriesComponent implements OnInit {

  queries : Array<Query> = new Array()
  page:number=0
  pages:Array<Number>
  totalPages:Number;
  statusNext:boolean=true
  statusPre:boolean = true
  constructor(private getQueriesService:QueryServiceService,
              private router : Router,private dialog:MatDialog,private snakBar:MatSnackBar) { }

  //load list data
  ngOnInit(): void 
  {
    console.log("on init"); console.log("page"+this.page)
    this.getQueriesList();
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
    this.getQueriesList();
  }
  pre()
  {
    console.log("page"+this.page)
    if(this.page==0) {this.statusPre=true; }
    else{this.statusPre=false;this.page=this.page.valueOf()-1;
      this.getQueriesList();}
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
      this.getQueriesList();}
  }
  //get event list
  getQueriesList()
  {
    console.log("get queries all list");
    this.getQueriesService.getQueryList(this.page).subscribe(data=>{
      this.queries = data['content'] ; console.log(this.queries)     
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

  //delete event
  deleteQuery(queryId:number)
  {
    console.log("delete");
    this.dialog.open(DialogBoxComponent).afterClosed().subscribe(data=>{
      console.log(data.delete)
   if(data.delete)
   { 
        console.log("delete");
        this.getQueriesService.deleteQuery(queryId)
        .subscribe(data=>{
          console.log(data);
          this.snakBar.open("successfully Deleted..","Cancle", {       
            duration : 3000,
            horizontalPosition:'center',
            verticalPosition:"bottom"
          });
          //navigate to list
          // this.getQueriesList();
          this.router.navigate(['/admin/dashboard']);
        },error=>{
          this.handleError(error);
        });
      }
    },error=>{
      this.handleError(error);
    })
  }

  //update event to navigate
  updateQuery(queryId:number)
  {
    console.log("update");
    this.router.navigate(['admin/query/all-queries/update-query-response',queryId]);
  }

  //view event to navigate
  viewQuery(queryId:number)
  {
    console.log("view");
    this.router.navigate(['admin/query/all-queries/view-query-response',queryId]);
  }
  addQuery(queryId:number)
  {
    console.log("add");
    this.router.navigate(['admin/query/all-queries/add-query-response',queryId]);
  }
}
