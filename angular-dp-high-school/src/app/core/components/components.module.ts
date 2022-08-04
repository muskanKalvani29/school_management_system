import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { RouterModule } from '@angular/router';
import { ParentSidebarComponent } from './parent-sidebar/parent-sidebar.component';
import { TeacherSidebarComponent } from './teacher-sidebar/teacher-sidebar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, AdminSidebarComponent, ParentSidebarComponent, TeacherSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    NavbarComponent,FooterComponent,AdminSidebarComponent,ParentSidebarComponent,TeacherSidebarComponent,
  ]
})
export class ComponentsModule { }
