import {Routes} from '@angular/router';
import { AccountSettingComponent } from 'src/app/features/admin/pages/account-setting/account-setting.component';
import { AddFeeStructureComponent } from 'src/app/features/admin/pages/fees/pages/add-fee-structure/add-fee-structure.component';
import { AdminDashboardComponent } from 'src/app/features/admin/pages/admin-dashboard/admin-dashboard.component';
import { SmsComponent } from 'src/app/features/admin/pages/sms/sms.component';
import { UpdateSchoolDetailComponent } from 'src/app/features/admin/pages/update-school-detail/update-school-detail.component';

export const AdminLayoutRoutes: Routes = 
[
    { path:'dashboard',component:AdminDashboardComponent},
    {path:'dashboard/school-detail/update-school-detail/:schoolDetailId',component:UpdateSchoolDetailComponent},
    // { path:'add-fee-structure',component:AddFeeStructureComponent},
    {
        path:'dashboard/best-student',
        children:[
            {
                path:'',
                loadChildren:()=>import("../../features/admin/pages/upload-best-student-detail/upload-best-student-detail.module")
                .then(m=>m.UploadBestStudentDetailModule)
            }
        ]
    },
    {
        path:'dashboard/activities-achivements',
        children:
        [
            {
                path:'',
                loadChildren:()=>import("../../features/admin/pages/upload-activities-achievements/upload-activities-achievements.module")
                .then(m=>m.UploadActivitiesAchievementsModule)
            }
        ]
    },
    {
        path:'dashboard/fee-structure',
        children:
        [
            {
                path:'',
                loadChildren:()=>import("../../features/admin/pages/fee-structure/fee-structure.module")
                .then(m=>m.FeeStructureModule)
            }
        ]
    },
    // {path:'upload-images/best-students',component:BestStudentsImagesComponent},
    // {path:'upload-images/activities-achievements',component:ActivitiesAchievementsImagesComponent},
    { path: 'students',
      children:[
        {
            path:'',
            loadChildren:()=>import("../../features/admin/pages/student/student.module").
            then(m=>m.StudentModule)  
        },
        
      ] 
    },
    { path: 'teachers' , 
      children:[
        {
            path:'',
            loadChildren:()=>import("../../features/admin/pages/teacher/teacher.module")
            .then(m=>m.TeacherModule)
        }
      ] 
    },
    {path: 'parents',
     children:[
        {
            path:'',
            loadChildren:()=>import("../../features/admin/pages/parent/parent.module")
            .then(m=>m.ParentModule)
        }
     ]
    },
    {path: 'teachers-meeting',  
     children:[
        {
            path:'',
            loadChildren:()=>import("../../features/admin/pages/teacher-meeting/teacher-meeting.module")
            .then(m=>m.TeacherMeetingModule)
        } 
     ] 
    },
    {
        path:'time-table',
        children:[
            {
                path:'',
                loadChildren:()=>import("../../features/admin/pages/time-table/time-table.module")
                .then(m=>m.TimeTableModule)
            }
        ]
    },
    {path: 'query',   
     children:[
        {
            path:'',
            loadChildren:()=>import("../../features/admin/pages/query/query.module")
            .then(m=>m.QueryModule)
        }
     ]
    },
    {path: 'inquiry',  
     children:[
        {
            path:'',
            loadChildren:()=>import("../../features/admin/pages/inquiry/inquiry.module")
            .then(m=>m.InquiryModule)
        }
     ]
    },
    {path: 'fees', 
     children:[
        {
            path:'',
            loadChildren:()=>import("../../features/admin/pages/fees/fees.module")
            .then(m=>m.FeesModule)
        }
     ]
    },
    {path: 'email',      component:SmsComponent},
    {path: 'event',    
     children:[
        {
            path:'',
            loadChildren:()=>import("../../features/admin/pages/event/event.module")
            .then(m=>m.EventModule)
        }
     ]
    },
    {path: 'holiday', 
     children:[
        {
            path:'',
            loadChildren:()=>import("../../features/admin/pages/holiday/holiday.module")
            .then(m=>m.HolidayModule)
        }
     ]
    },
    {path: 'time-table', 
     children:[
        {
            path:'',
            loadChildren:()=>import("../../features/admin/pages/time-table/time-table.module")
            .then(m=>m.TimeTableModule)
        }
     ]
    },
    {path: 'account-setting',  component:AccountSettingComponent}
];