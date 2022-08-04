import {Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {Query} from 'src/app/core/model/Query';
import {QueryServiceService} from 'src/app/features/admin/pages/query/service/query-service.service';

@Component({
  selector: 'app-view-query',
  templateUrl: './view-query.component.html',
  styleUrls: ['./view-query.component.css']
})
export class ViewQueryComponent implements OnInit {

  queryId: number;
  query:Query;
  constructor(private router:Router,
    private route : ActivatedRoute,
    private queryService:QueryServiceService) { }

  ngOnInit(): void {

    console.log("oninit");
    this.query = new Query();
    this.queryId = this.route.snapshot.params['query_id'];
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
  goToQueriesList()
  {
    console.log("go to");
    this.router.navigate(['parent/query/all-queries']);
  }
}






  

   

   
  



