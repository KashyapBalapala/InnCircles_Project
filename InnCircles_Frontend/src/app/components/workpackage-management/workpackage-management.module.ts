import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkPackagesManagementComponent } from './work-packages-management/work-packages-management.component';
import { WorkpackageManagementRoutingModule } from './workpackage-management.routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WorkPackagesManagementComponent
  ],
  imports: [
    CommonModule,
    WorkpackageManagementRoutingModule,
    FormsModule
  ]
})
export class WorkpackageManagementModule { }
