import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddActivitiesAchievementsImageComponent } from './pages/add-activities-achievements-image/add-activities-achievements-image.component';
import { GetAllActivitiesAchivementsComponent } from './pages/get-all-activities-achivements/get-all-activities-achivements.component';
import { UpdateActivitiesAchievementsDetailComponent } from './pages/update-activities-achievements-detail/update-activities-achievements-detail.component';
import { ViewActivitiesAchievementsDetailComponent } from './pages/view-activities-achievements-detail/view-activities-achievements-detail.component';

const routes: Routes = [
  {path:'all-activities-achivements',component:GetAllActivitiesAchivementsComponent},
  {path:'all-activities-achivements/view/:imageId',component:ViewActivitiesAchievementsDetailComponent},
  {path:'all-activities-achivements/update/:imageId',component:UpdateActivitiesAchievementsDetailComponent},
  {path:'all-activities-achivements/add-activities-achivements',component:AddActivitiesAchievementsImageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadActivitiesAchievementsRoutingModule { }
