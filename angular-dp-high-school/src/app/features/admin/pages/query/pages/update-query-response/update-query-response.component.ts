import { Component, OnInit } from '@angular/core';
import {Query} from 'src/app/core/model/Query';
import {QueryServiceService} from 'src/app/features/admin/pages/query/service/query-service.service';
import {Router,ActivatedRoute} from '@angular/router';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
@Component({
  selector: 'app-update-query-response',
  templateUrl: './update-query-response.component.html',
  styleUrls: ['./update-query-response.component.css']
})
export class UpdateQueryResponseComponent implements OnInit {

  queryId : number;
  query : Query;
  constructor(private updateQueryService : QueryServiceService,
              private router : Router,
              private route : ActivatedRoute,private snakBar:MatSnackBar) { }

  ngOnInit(): void
  {
    this.query = new Query();
    this. queryId = this.route.snapshot.params['queryId'];
    this.updateQueryService.getQuery(this.queryId)
    .subscribe(data=>{
      console.log(data);
      this.query = data;
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
  //update query response
  updateQueryResponse()
  {
    this.updateQueryService.updateQuery(this.queryId,this.query)
    .subscribe(data=>{
      console.log(data);
      this.query = new Query();
      console.log("hi");
      this.snakBar.open("successfully Updated..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.goToQueryList();
    },error=>{
      this.handleError(error);
    })
  }

  //onsubmit
  onSubmit()
  {
    console.log("onsubmit");
    this.updateQueryResponse();
  }

  //get query list
  goToQueryList()
  {
    console.log("hi");
    this.router.navigate(['admin/query/all-queries']);
  }
}
