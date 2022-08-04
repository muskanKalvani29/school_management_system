import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllQueriesComponent } from './pages/all-queries/all-queries.component';
import { QueryResponseComponent } from './pages/query-response/query-response.component';
import { UpdateQueryResponseComponent } from './pages/update-query-response/update-query-response.component';
import { ViewQueryResponseComponent } from './pages/view-query-response/view-query-response.component';

const routes: Routes = [
  {path: 'all-queries',           component:AllQueriesComponent},
  {path: 'all-queries/add-query-response/:queryId',    component:QueryResponseComponent},
  {path: 'all-queries/update-query-response/:queryId', component:UpdateQueryResponseComponent},
  {path: 'all-queries/view-query-response/:queryId', component:ViewQueryResponseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryRoutingModule { }
