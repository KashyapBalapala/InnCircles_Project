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
  selectedFile: File | null = null;
  editSelectedFile: File | null = null;

  @Output() locationTypeEmitter = new EventEmitter();

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

  moveToCreation(locationType: any) {
    this.locationTypeEmitter.emit(locationType);
  }

  
  addLocationType() {
    if (this.newLocationTypeName) {
      const formData = new FormData();
      formData.append('name', this.newLocationTypeName);
      
      if (this.selectedFile) {
        formData.append('image', this.selectedFile); 
      }
      console.log(formData)
      this.createNewLocation(formData);
    }
  }

  resetForm() {
    this.newLocationTypeName = '';
    this.selectedFile = null;
  }

  createNewLocation(locationType: any) {
    this.locationService
    .createNewLocationType(locationType)
    .pipe(
      catchError((error: any) => {
        alert('An error occurred: ' + error?.error?.message);
        return of(null);
      })
    )
    .subscribe((data: any) => {
      this.fetchLocationTypes();
      this.resetForm();
    });
  }

  toggleEdit(locationType: any) {
    if (this.editingState[locationType._id]) {
      this.editingState[locationType._id] = false;
      this.editLocationType(locationType);
      return;
    }
    this.editingState[locationType._id] = !this.editingState[locationType._id];
  }

  editLocationType(locationType: any) {
    const formData = new FormData();
    formData.append('name', locationType.name);

    if (this.editSelectedFile) {
      formData.append('image', this.editSelectedFile);
    }
    this.locationService
    .editLocationType(locationType._id, formData)
    .pipe(
      catchError((error: any) => {
        alert('An error occurred: ' + error?.error?.message);
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
        alert('An error occurred: ' + error?.error?.message);
        return of(null);
      })
    )
    .subscribe((data: any) => {
      this.fetchLocationTypes();
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onEditFileSelected(event: any, locationType: any) {
    this.editSelectedFile = event.target.files[0];
    
  }
}
