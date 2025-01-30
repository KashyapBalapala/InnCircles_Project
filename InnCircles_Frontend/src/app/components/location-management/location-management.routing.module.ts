import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationTypesComponent } from './location-types/location-types.component';
import { LocationCreationComponent } from './location-creation/location-creation.component';
import { LocationSmartComponent } from './location-smart/location-smart.component';

const routes: Routes = [
  { path: '', component: LocationSmartComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationManagementRoutingModule { }
