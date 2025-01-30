import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UOMManagementComponent } from './uom-management/uom-management.component';
import { FormsModule } from '@angular/forms';
import { UOMManagementRoutingModule } from './uommanagement.routing.module';



@NgModule({
  declarations: [
    UOMManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UOMManagementRoutingModule
  ]
})
export class UOMManagementModule { }
