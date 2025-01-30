import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LocationServiceService } from '../../../services/location-service.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-location-types',
  standalone: false,

  templateUrl: './location-types.component.html',
  styleUrl: './location-types.component.css',
})
export class LocationTypesComponent {
  constructor(
    private router: Router,
    private locationService: LocationServiceService
  ) {}

  locationTypes: any[] = [];
  editingState: { [key: number]: boolean } = {};
  newLocationTypeName: string = '';

  @Output() locationTypeEmitter = new EventEmitter();

  ngOnInit() {
    this.fetchLocationTypes();
  }

  fetchLocationTypes() {
    this.locationService
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

  moveToCreation(locationType: any) {
    this.locationTypeEmitter.emit(locationType);
  }

  addLocationType() {
    if (this.newLocationTypeName) {
      const newLocationType: any = {
        name: this.newLocationTypeName,
        description: '' 
      };
      this.createNewLocation(newLocationType);
      this.newLocationTypeName = '';
    }
  }

  createNewLocation(locationType: any) {
    this.locationService
    .createNewLocationType(locationType)
    .pipe(
      catchError((error: any) => {
        alert('An error occurred: ' + error.message);
        return of(null);
      })
    )
    .subscribe((data: any) => {
      this.fetchLocationTypes();
    });
  }

  toggleEdit(locationType: any, name: any) {
    if (this.editingState[locationType._id]) {
      this.editingState[locationType._id] = false;
      this.editLocationType(locationType);
      return;
    }
    this.editingState[locationType._id] = !this.editingState[locationType._id];
  }

  editLocationType(locationType: any) {
    this.locationService
    .editLocationType(locationType._id, locationType)
    .pipe(
      catchError((error: any) => {
        alert('An error occurred: ' + error.message);
        return of(null);
      })
    )
    .subscribe((data: any) => {
      this.fetchLocationTypes();
    });
  }


  deleteLocationType(_id: string) {
    this.locationService
    .deleteLocationType(_id)
    .pipe(
      catchError((error: any) => {
        alert('An error occurred: ' + error.message);
        return of(null);
      })
    )
    .subscribe((data: any) => {
      this.fetchLocationTypes();
    });
  }

  
}
