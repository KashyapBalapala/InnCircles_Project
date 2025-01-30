import { Component, Input } from '@angular/core';
import { LocationServiceService } from '../../../services/location-service.service';
import { QuantityService } from '../../../services/quantity.service';
import { catchError, of } from 'rxjs';
import { WorkPackageService } from '../../../services/work-package.service';

@Component({
  selector: 'app-quantities',
  templateUrl: './quantities.component.html',
  styleUrl: './quantities.component.css'
})
export class QuantitiesComponent {


  @Input() locationType: any;

  locationTypes: any[] = []; 
  selectedLocationType: string = ''; 
  locations: any[] = [];  
  workPackages: any[] = [];
  lt: any;

  constructor(
    private quantityService: QuantityService,
    private locationTypeService: LocationServiceService,
    private workPackageService: WorkPackageService
  ) {}

  ngOnInit(): void {
    this.fetchLocations();
  }

  fetchLocations() {
    this.locationTypeService
            .getAllLocations(this.locationType)
            .pipe(
              catchError((error) => {
                alert('An error occurred: ' + error.message);
                return of([]);
              })
            )
            .subscribe((data: any) => {
              this.locations = data;
              this.lt = data[0].locationTypeId.name;
              this.fetchWorkPackages();
            });
  }

  fetchWorkPackages() {
    this.workPackageService
      .getWpUoms(this.locationType)
      .pipe(
        catchError((error) => {
          alert('An error occurred: ' + error.message);
          return of([]);
        })
      )
      .subscribe((data: any) => {
        this.workPackages = data;
        console.log(data);
      });
  }

  onLocationTypeChange() {
    if (!this.selectedLocationType) return;

    
  }

  saveQuantity(location: any, workPackage: any) {
    const quantityData = {
      locationId: location._id,
      workPackageId: workPackage._id,
      uomId: workPackage.uom._id,
      quantityValue: workPackage.quantity
    };

    
  }

  saveUOM(location: any, wp: any) {
    
  }

  dummyUOM: any[] = [];
  newUOMModal(wp: any) {
    this.dummyUOM = {...wp.uoms};
    console.log(this.dummyUOM);
  }
}
