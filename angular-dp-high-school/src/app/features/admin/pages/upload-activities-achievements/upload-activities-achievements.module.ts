import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadActivitiesAchievementsRoutingModule } from './upload-activities-achievements-routing.module';
import { GetAllActivitiesAchivementsComponent } from './pages/get-all-activities-achivements/get-all-activities-achivements.component';
import { AddActivitiesAchievementsImageComponent } from './pages/add-activities-achievements-image/add-activities-achievements-image.component';
import { UpdateActivitiesAchievementsDetailComponent } from './pages/update-activities-achievements-detail/update-activities-achievements-detail.component';
import { ViewActivitiesAchievementsDetailComponent } from './pages/view-activities-achievements-detail/view-activities-achievements-detail.component';
import { FormsModule } from '@angular/forms';
import { ActivitiesAchievementsPipe } from './pipes/activities-achievements.pipe';
import {  MatDialogModule } from '@angular/material/dialog';
// import {MatButtonModule} from '@angular/material/button';
// import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [GetAllActivitiesAchivementsComponent,  ViewActivitiesAchievementsDetailComponent, ActivitiesAchievementsPipe],
  imports: [
    CommonModule,
    FormsModule,
    UploadActivitiesAchievementsRoutingModule,
    MatDialogModule
    // MatButtonModule,
    // MatSnackBarModule
  ],
  exports:[
    // MatButtonModule
  ]
})
export class UploadActivitiesAchievementsModule { }
