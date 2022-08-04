import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllParentsComponent } from './pages/all-parents/all-parents.component';
import { ViewParentComponent } from './pages/view-parent/view-parent.component';

const routes: Routes = [
  {path: 'all-parents',  component:AllParentsComponent},
  {path: 'all-parents/view-parent/:parentId',  component:ViewParentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }
