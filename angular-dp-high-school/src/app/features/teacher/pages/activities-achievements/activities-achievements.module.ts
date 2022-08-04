import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesAchievementsRoutingModule } from './activities-achievements-routing.module';
import { AllStudentsComponent } from './pages/all-students/all-students.component';
import { AddActivityAchievementComponent } from './pages/add-activity-achievement/add-activity-achievement.component';
import { ViewActivityAchievementComponent } from './pages/view-activity-achievement/view-activity-achievement.component';
import { UpdateActivityAchievementComponent } from './pages/update-activity-achievement/update-activity-achievement.component';
import { FormsModule } from '@angular/forms';
import {  MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AllStudentsComponent, AddActivityAchievementComponent, ViewActivityAchievementComponent, UpdateActivityAchievementComponent],
  imports: [
    CommonModule,
    ActivitiesAchievementsRoutingModule,
    FormsModule,MatDialogModule
  ]
})
export class ActivitiesAchievementsModule { }
