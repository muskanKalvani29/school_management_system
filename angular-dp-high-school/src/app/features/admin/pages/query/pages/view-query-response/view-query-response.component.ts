import { Component, OnInit } from '@angular/core';
import {Query} from 'src/app/core/model/Query';
import {QueryServiceService} from 'src/app/features/admin/pages/query/service/query-service.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-query-response',
  templateUrl: './view-query-response.component.html',
  styleUrls: ['./view-query-response.component.css']
})
export class ViewQueryResponseComponent implements OnInit {

  queryId : number
  query : Query
  constructor(private viewQueryService:QueryServiceService,
              private router : Router,
              private route : ActivatedRoute) { }


  ngOnInit(): void 
  {
      console.log("oninit");
      this.query = new Query();
      this.queryId = this.route.snapshot.params['queryId'];
      this.viewQueryService.getQuery(this.queryId)
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
  goToQueryList()
  {
    console.log("goto");
    this.router.navigate(['admin/query/all-queries']);
  }

}
