import { Component, OnInit } from '@angular/core';
import {Query} from 'src/app/core/model/Query';
import {QueryServiceService} from 'src/app/features/admin/pages/query/service/query-service.service';
import {Router,ActivatedRoute} from '@angular/router';
import { Parent } from 'src/app/core/model/Parent';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
@Component({
  selector: 'app-query-response',
  templateUrl: './query-response.component.html',
  styleUrls: ['./query-response.component.css']
})
export class QueryResponseComponent implements OnInit {

  queryId : number;
  query : Query;
  constructor(private queryService : QueryServiceService,
              private router : Router,
              private route : ActivatedRoute,private snakBar:MatSnackBar) { }
  // query : Query = new Query();
  
  ngOnInit(): void 
  {
    this.query = new Query();
    this. queryId = this.route.snapshot.params['queryId'];
    this.queryService.getQuery(this.queryId)
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


  //write service to get query

  addQueryResponse(addQueryResponse:any)
  {
    this.query = new Query();
    this.query.queryMessage = addQueryResponse.queryMessage;
    this.query.responseMessage = addQueryResponse.responseMessage;
    this.queryService.updateQuery(this.queryId,this.query).subscribe(data=>{console.log(data)
      this.snakBar.open("successfully Added..","Cancle", {       
        duration : 3000,
        horizontalPosition:'center',
        verticalPosition:"bottom"
      });
      this.router.navigate(['/admin/query/all-queries']);
    },error=>{
      this.handleError(error);
    });
    
  }
}
