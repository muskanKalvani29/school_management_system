import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeDetailsComponent } from 'src/app/features/parent/pages/fee/pages/fee-details/fee-details.component';
import { ParentDashboardComponent } from 'src/app/features/parent/pages/parent-dashboard/parent-dashboard.component';
import { ProgressReportComponent } from 'src/app/features/parent/pages/progress-report/progress-report.component';

export const routes: Routes = [
  {path:'home',component:ParentDashboardComponent},
  {path:'progress-report',component:ProgressReportComponent},
  {path:'fees',
   children:[
     {
       path:'',
       loadChildren:()=>import('../../features/parent/pages/fee/fee.module')
       .then(m=>m.FeeModule)
     }
   ]},
   {
     path:'meeting',
     children:[
       {
         path:'',
         loadChildren:()=>import('../../features/parent/pages/parent-meeting/parent-meeting.module')
         .then(m=>m.ParentMeetingModule)
       }
     ]
   },
   {
    path:'profile',
    children:[
      {
        path:'',
        loadChildren:()=>import('../../features/parent/pages/profile/profile.module')
        .then(m=>m.ProfileModule)
      }
    ]
  },
  {
    path:'query',
    children:[
      {
        path:'',
        loadChildren:()=>import('../../features/parent/pages/query/query.module')
        .then(m=>m.QueryModule)
      }
    ]
  },
  {
    path:'student',
    children:[
      {
        path:'',
        loadChildren:()=>import('../../features/parent/pages/student/student.module')
        .then(m=>m.StudentModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentLayoutRoutingModule { }
