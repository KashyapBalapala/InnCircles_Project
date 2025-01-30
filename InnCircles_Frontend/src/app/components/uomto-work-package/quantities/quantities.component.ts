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
                alert('An error occurred: ' + error?.error?.message);
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
          alert('An error occurred: ' + error?.error?.message);
          return of([]);
        })
      )
      .subscribe((data: any) => {
        this.workPackages = data;
        console.log(data);
      });
  }

  onLocationSelect(location: any) {
    this.quantityService
      .getLocationQuantity(location._id)
      .pipe(
        catchError((error) => {
          alert('An error occurred: ' + error?.error?.message);
          return of([]);
        })
      )
      .subscribe((data: any) => {
        this.workPackages = this.modifyWorkPackages(data, this.workPackages);
        console.log(this.workPackages)
      });
  }

  modifyWorkPackages(data: any, workPackages: any) {
    return workPackages.map((wp: any) => {
      wp.uoms = wp.uoms.map((uom: any) => {
        const quantityEntry = data.find(
          (entry: any) =>
            entry.workerPackageId._id === wp._id && entry.uomId._id === uom._id
        );
  
        return {
          ...uom,
          quantityValue: quantityEntry ? quantityEntry.quantityValue : null,
        };
      });
  
      return wp;
    });
  }

  saveQuantity(location: any, workPackage: any, uom: any) {
    console.log(workPackage);
    const quantityData = {
      workerPackageId: workPackage._id,
      uomId: uom._id,
      quantityValue: uom.quantityValue
    };

    this.quantityService
      .updateQuantity(quantityData, location._id)
      .pipe(
        catchError((error) => {
          alert('An error occurred: ' + error?.error?.message);
          return of([]);
        })
      )
      .subscribe((data: any) => {
        console.log(data);
      });
  }
}
