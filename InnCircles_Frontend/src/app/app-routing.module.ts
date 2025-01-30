import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementOptionsComponent } from './components/management-options/management-options.component';
import { LocationCreationComponent } from './components/location-management/location-creation/location-creation.component';

const routes: Routes = [
  { path: '', component: ManagementOptionsComponent },
  {
    path: 'location-types',
    loadChildren: () => import('./components/location-management/location-management.module').then((m) => m.LocationManagementModule)
  },
  {
    path: 'work-package',
    loadChildren: () => import('./components/workpackage-management/workpackage-management.module').then((m) => m.WorkpackageManagementModule)
  },
  {
    path: 'uom-management',
    loadChildren: () => import('./components/uommanagement/uommanagement.module').then((m) => m.UOMManagementModule)
  },
  {
    path: 'uom-wp',
    loadChildren: () => import('./components/uomto-work-package/uomto-work-package.module').then((m) => m.UOMToWorkPackageModule)
  },
  { path: 'location-creation', component: LocationCreationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
