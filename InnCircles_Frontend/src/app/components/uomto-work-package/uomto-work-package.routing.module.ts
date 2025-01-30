import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UomToWpComponent } from './uom-to-wp/uom-to-wp.component';
import { SmartComponent } from './smart/smart.component';


const routes: Routes = [
  { path: '', component:  SmartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UOMToWorkPackageRoutingModule { }