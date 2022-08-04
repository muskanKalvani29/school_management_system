import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryRoutingModule } from './query-routing.module';
import { AllQueriesComponent } from './pages/all-queries/all-queries.component';
import { UploadQueryComponent } from './pages/upload-query/upload-query.component';
import { ViewQueryComponent } from './pages/view-query/view-query.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AllQueriesComponent, UploadQueryComponent, ViewQueryComponent, ],
  imports: [
    CommonModule,
    QueryRoutingModule,
    FormsModule
  ]
})
export class QueryModule { }
