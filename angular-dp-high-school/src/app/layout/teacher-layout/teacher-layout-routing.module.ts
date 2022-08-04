import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeacherDashboardComponent } from 'src/app/features/teacher/pages/teacher-dashboard/teacher-dashboard.component';
import { UpdateStandardComponent } from 'src/app/features/teacher/pages/update-standard/update-standard.component';

export const routes: Routes = [
  {path:'home',component:TeacherDashboardComponent},
  {path:'update-standard',component:UpdateStandardComponent},
  {path:'time-table',
   children:[
     {
        path:'',
        loadChildren:()=>import('../../features/teacher/pages/time-table/time-table.module')
        .then(m=>m.TimeTableModule)
     }
   ]},
  {path:'attendance',
   children:[
     {
       path:'',
       loadChildren:()=>import('../../features/teacher/pages/attendance/attendance.module')
       .then(m=>m.AttendanceModule)
     }
   ]},
   {path:'activities-achievements',
   children:[
     {
       path:'',
       loadChildren:()=>import('../../features/teacher/pages/activities-achievements/activities-achievements.module')
       .then(m=>m.ActivitiesAchievementsModule)
     }
   ]},
   {path:'study-material',
   children:[
     {
       path:'',
       loadChildren:()=>import('../../features/teacher/pages/documents/documents.module')
       .then(m=>m.DocumentsModule)
     }
   ]},
   {path:'schedule',
   children:[
     {
       path:'',
       loadChildren:()=>import('../../features/teacher/pages/schedule/schedule.module')
       .then(m=>m.ScheduleModule)
     }
   ]},
   {path:'parents-meeting',
   children:[
     {
       path:'',
       loadChildren:()=>import('../../features/teacher/pages/parents-meeting/parents-meeting.module')
       .then(m=>m.ParentsMeetingModule)
     }
   ]},
   {path:'profile',
   children:[
     {
       path:'',
       loadChildren:()=>import('../../features/teacher/pages/profile/profile.module')
       .then(m=>m.ProfileModule)
     }
   ]},
   {path:'result',
   children:[
     {
       path:'',
       loadChildren:()=>import('../../features/teacher/pages/results/results.module')
       .then(m=>m.ResultsModule)
     }
   ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherLayoutRoutingModule { }
