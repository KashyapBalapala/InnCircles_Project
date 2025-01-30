import { Component, EventEmitter, Output } from '@angular/core';
import { LocationServiceService } from '../../../services/location-service.service';
import { catchError, of, pipe } from 'rxjs';
import { UomManagementService } from '../../../services/uom-management.service';
import { WorkPackageService } from '../../../services/work-package.service';

@Component({
  selector: 'app-uom-to-wp',
  standalone: false,

  templateUrl: './uom-to-wp.component.html',
  styleUrl: './uom-to-wp.component.css',
})
export class UomToWpComponent {
  locationTypes: any[] = [];
  selectedLocationType: any;
  workPackages: any[] = [];
  showUomSelector = false;
  selectedWorkPackage: any;
  availableUoms: any[] = [];
  displayDialog: boolean = false;
  selectedUomId: any;

  @Output() locationTypeEmitter = new EventEmitter();

  constructor(
    private uomService: UomManagementService,
    private locationTypeService: LocationServiceService,
    private workPackageService: WorkPackageService
  ) {}

  ngOnInit(): void {
    this.loadLocationTypes();
    this.fetchUOM();
  }

  loadLocationTypes() {
    this.locationTypeService
      .getAllLocationTypes()
      .pipe(
        catchError((error) => {
          alert('An error occurred: ' + error.message);
          return of([]);
        })
      )
      .subscribe((data: any) => {
        this.locationTypes = data;
      });
  }

  fetchUOM() {
    this.uomService
      .getUom()
      .pipe(
        catchError((error) => {
          alert('An error occurred: ' + error.message);
          return of([]);
        })
      )
      .subscribe((data: any) => {
        this.availableUoms = data;
      });
  }

  onLocationTypeChange() {
    this.workPackageService
      .getWpUoms(this.selectedLocationType)
      .pipe(
        catchError((error) => {
          alert('An error occurred: ' + error.message);
          return of([]);
        })
      )
      .subscribe((data: any) => {
        this.workPackages = data;
      });
  }

  openDialog(wp: any) {
    this.selectedWorkPackage = { ...wp };
    this.displayDialog = true;
  }

  assignUom(uomId: string) {
    if (!this.selectedWorkPackage || !uomId) return;
    console.log(uomId);
    const selectedUom = this.availableUoms.find((uom) => uom._id === uomId);
    if (selectedUom) {
      this.selectedWorkPackage.uoms.push(selectedUom);
    }

    this.selectedUomId = '';
  }

  removeUom(wp: any, uom: any) {
    this.workPackageService
      .deleteUOMToWP(wp._id, uom.value._id)
      .pipe(
        catchError((error) => {
          alert('An error occurred: ' + error.message);
          return of([]);
        })
      )
      .subscribe((data: any) => {
        this.onLocationTypeChange();
      });
  }

  saveUoms() {
    const ids = this.selectedWorkPackage.uoms.map((item: any) => item._id);
    const save = {
      uomIds: ids,
    };
    this.workPackageService
      .addMultipleUoms(save, this.selectedWorkPackage._id)  
      .pipe(
        catchError((error) => {
          alert('An error occurred: ' + error.message);
          return of([]);
        })
      )
      .subscribe((data: any) => {
        this.onLocationTypeChange();
        this.displayDialog = false;
      });
  }

  changeScreen() {
    this.locationTypeEmitter.emit(this.selectedLocationType);
  }

  saveQuantities() {}
}
