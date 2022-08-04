import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllQueriesComponent } from './pages/all-queries/all-queries.component';
import { UploadQueryComponent } from './pages/upload-query/upload-query.component';
import { ViewQueryComponent } from './pages/view-query/view-query.component';

const routes: Routes = [
  {path:'all-queries',component:AllQueriesComponent},
  {path:'all-queries/view-query/:query_id',component:ViewQueryComponent},
  {path:'upload-query',component:UploadQueryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryRoutingModule { }
