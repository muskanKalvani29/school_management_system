import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentHomeComponent } from './pages/student-home/student-home.component';
import { AllTimetablesComponent } from './pages/all-timetables/all-timetables.component';
import { AllDocumentsComponent } from './pages/all-documents/all-documents.component';
import { AllResultsComponent } from './pages/all-results/all-results.component';
import { ViewResultComponent } from './pages/view-result/view-result.component';
import { ViewDocumentComponent } from './pages/view-document/view-document.component';
import { ViewTimetableComponent } from './pages/view-timetable/view-timetable.component';
import { RouterModule } from '@angular/router';
import { SafePipePipe } from 'src/app/features/Pipes/safe-pipe.pipe';




@NgModule({
  declarations: [StudentHomeComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    RouterModule
  ]
})
export class StudentModule { }
