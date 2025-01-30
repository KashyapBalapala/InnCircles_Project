import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UOMManagementComponent } from './uom-management/uom-management.component';


const routes: Routes = [
  { path: '', component: UOMManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UOMManagementRoutingModule { }