import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddActivityAchievementComponent } from './pages/add-activity-achievement/add-activity-achievement.component';
import { AllStudentsComponent } from './pages/all-students/all-students.component';
import { UpdateActivityAchievementComponent } from './pages/update-activity-achievement/update-activity-achievement.component';
import { ViewActivityAchievementComponent } from './pages/view-activity-achievement/view-activity-achievement.component';

const routes: Routes = [
  {path:'all-students',component:AllStudentsComponent},
  {path:'all-students/add/:grNo',component:AddActivityAchievementComponent},
  {path:'all-students/view/:grNo',component:ViewActivityAchievementComponent},
  {path:'all-students/view/update/:activityId',component:UpdateActivityAchievementComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesAchievementsRoutingModule { }
