import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import { QueryRoutingModule } from './query-routing.module';
import { QueryServiceService } from './service/query-service.service';
import { AllQueriesComponent } from './pages/all-queries/all-queries.component';
import { QueryResponseComponent } from './pages/query-response/query-response.component';
import { UpdateQueryResponseComponent } from './pages/update-query-response/update-query-response.component';
import { ViewQueryResponseComponent } from './pages/view-query-response/view-query-response.component';
import {  MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AllQueriesComponent,QueryResponseComponent, UpdateQueryResponseComponent,ViewQueryResponseComponent],
  imports: [
    CommonModule,
    QueryRoutingModule,
    FormsModule,MatDialogModule
  ],
  providers:[QueryServiceService]
})
export class QueryModule { }
