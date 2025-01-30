import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationTypesComponent } from './location-types/location-types.component';
import { LocationCreationComponent } from './location-creation/location-creation.component';
import { LocationManagementRoutingModule } from './location-management.routing.module';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LocationSmartComponent } from './location-smart/location-smart.component';


@NgModule({
  declarations: [
    LocationTypesComponent,
    LocationSmartComponent,
    LocationCreationComponent
  ],
  imports: [
    CommonModule,
    LocationManagementRoutingModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class LocationManagementModule { }
