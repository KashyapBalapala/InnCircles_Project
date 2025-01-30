import { Component, Input } from '@angular/core';
import { LocationServiceService } from '../../../services/location-service.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-location-creation',
  standalone: false,
  
  templateUrl: './location-creation.component.html',
  styleUrl: './location-creation.component.css'
})
export class LocationCreationComponent {

  constructor(private locationService: LocationServiceService) {}

  @Input() locationType: any ; 

  

  locations:any[] = [];
  editingState: { [key: string]: boolean } = {};

  newLocationName: string = '';


  ngOnInit() {
    this.fetchLocations();
  }

  fetchLocations() {
    this.locationService
        .getAllLocations(this.locationType._id)
        .pipe(
          catchError((error) => {
            alert('An error occurred: ' + error?.error?.message);
            return of([]);
          })
        )
        .subscribe((data: any) => {
          this.locations = data;
          console.log(this.locations);
        });
  }

  addlocation() {
    const newLocation = {
      name: this.newLocationName,
      description: '',
      locationTypeId: this.locationType._id
    };
    this.locationService
        .addLocation(newLocation)
        .pipe(
          catchError((error) => {
            alert('An error occurred: ' + error?.error?.message);
            return of(null);
          })
        )
        .subscribe((data: any) => {
          this.fetchLocations();
        });
  }

  toggleEdit(location: any) {
    if (this.editingState[location._id]) {
      this.editingState[location._id] = false;
      this.editLocationType(location);
      return;
    }
    this.editingState[location._id] = !this.editingState[location._id];
  }

  editLocationType(location: any) {
    this.locationService
        .editLocation(location)
        .pipe(
          catchError((error) => {
            alert('An error occurred: ' + error?.error?.message);
            return of(null);
          })
        )
        .subscribe((data: any) => {
          this.fetchLocations();
        });
  }

  deletelocation(id: number) {
    this.locationService
        .deleteLocation(id)
        .pipe(
          catchError((error) => {
            alert('An error occurred: ' + error?.error?.message);
            return of(null);
          })
        )
        .subscribe((data: any) => {
          this.fetchLocations();
        });
  }
}


