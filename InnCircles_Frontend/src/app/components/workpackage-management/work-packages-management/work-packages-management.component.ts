import { Component } from '@angular/core';
import { LocationServiceService } from '../../../services/location-service.service';
import { catchError, of } from 'rxjs';
import { WorkPackageService } from '../../../services/work-package.service';

@Component({
  selector: 'app-work-packages-management',
  standalone: false,

  templateUrl: './work-packages-management.component.html',
  styleUrl: './work-packages-management.component.css',
})
export class WorkPackagesManagementComponent {
  constructor(
    private locationService: LocationServiceService,
    private workPackageService: WorkPackageService
  ) {}

  locationTypes: any[] = [];

  workPackages: any[] = [];

  selectedLocationType: any = null;
  newWorkPackageName: string = '';

  editingWorkPackage: any;

  ngOnInit() {
    this.fetchLocationTypes();
  }

  fetchLocationTypes() {
    this.locationService
      .getAllLocationTypes()
      .pipe(
        catchError((error) => {
          alert('An error occurred: ' + error?.error?.message);
          return of([]);
        })
      )
      .subscribe((data: any) => {
        this.locationTypes = data;
      });
  }

  fetchWorkPackages(id: any) {
    this.workPackageService
      .getWorkPackagesByType(id)
      .pipe(
        catchError((error) => {
          alert('An error occurred: ' + error?.error?.message);
          console.log(error);
          return of([]);
        })
      )
      .subscribe((data: any) => {
        this.workPackages = data;
      });
  }

  selectLocationType(locationType: any) {
    this.selectedLocationType = locationType;
    this.fetchWorkPackages(locationType._id);
  }

  addWorkPackage() {
    const wp = {
      name:this.newWorkPackageName,
      description: '',
      locationTypeId: this.selectedLocationType._id,
    };

    this.workPackageService
      .addWorkPackage(wp)
      .pipe(
        catchError((error) => {
          alert('An error occurred: ' + error?.error?.message);
          return of([]);
        })
      )
      .subscribe((data: any) => {
        this.fetchWorkPackages(this.selectedLocationType._id);
        this.newWorkPackageName = '';
      });
  }

  editWorkPackage(workPackage: any) {
    this.editingWorkPackage = {...workPackage};
  }

  saveWorkPackage(workPackage: any) {
    this.workPackageService
      .updateWorkPackage(workPackage)
      .pipe(
        catchError((error) => {
          alert('An error occurred: ' + error?.error?.message);
          return of([]);
        })
      )
      .subscribe((data: any) => {
        this.fetchWorkPackages(this.selectedLocationType._id);
        this.editingWorkPackage = {};
      });
  }

  cancelEdit() {
    this.editingWorkPackage = {};
  }

  deleteWorkPackage(workPackage: any) {
    this.workPackageService
      .deleteWorkPackage(workPackage._id)
      .pipe(
        catchError((error) => {
          alert('An error occurred: ' + error?.error?.message);
          return of([]);
        })
      )
      .subscribe((data: any) => {
        this.fetchWorkPackages(this.selectedLocationType._id);
      });
  }
}
