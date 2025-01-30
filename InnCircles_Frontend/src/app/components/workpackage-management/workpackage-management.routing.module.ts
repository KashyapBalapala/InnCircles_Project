import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkPackagesManagementComponent } from './work-packages-management/work-packages-management.component';


const routes: Routes = [
  { path: '', component: WorkPackagesManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkpackageManagementRoutingModule { }