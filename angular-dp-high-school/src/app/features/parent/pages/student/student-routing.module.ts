import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllDocumentsComponent } from './pages/all-documents/all-documents.component';
import { AllResultsComponent } from './pages/all-results/all-results.component';
import { AllTimetablesComponent } from './pages/all-timetables/all-timetables.component';
import { StudentHomeComponent } from './pages/student-home/student-home.component';
import { ViewDocumentComponent } from './pages/view-document/view-document.component';
import { ViewResultComponent } from './pages/view-result/view-result.component';
import { ViewTimetableComponent } from './pages/view-timetable/view-timetable.component';

const routes: Routes = [
  {path:'home',component:StudentHomeComponent},
  {path:'home/document/all-documents',component:AllDocumentsComponent},
  {path:'home/result/all-results',component:AllResultsComponent},
  {path:'home/time-table/all-time-tables',component:AllTimetablesComponent},
  {path:'home/document/all-documents/view-document/:document_id',component:ViewDocumentComponent},
  {path:'home/result/all-results/view-result/:resultfile_id',component:ViewResultComponent},
  {path:'home/time-table/all-time-tables/view-time-table/:timetable_id',component:ViewTimetableComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
