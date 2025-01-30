import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  createNewLocationType(locationType: any) {
    return this.http.post(`${this.apiUrl}/location-types`, locationType);
  }

  editLocationType(id: string, locationType: any) {
    return this.http.put(`${this.apiUrl}/location-types/${id}`, locationType);
  }

  deleteLocationType(id: any) {
    return this.http.delete(`${this.apiUrl}/location-types/${id}`);
  }

  getAllLocationTypes() {
    return this.http.get(`${this.apiUrl}/location-types`);
  }

  getAllLocations(locationTypeId: any) {
    return this.http.get(`${this.apiUrl}/locations/location-type/${locationTypeId}`);
  }

  addLocation(location: any) {
    return this.http.post(`${this.apiUrl}/locations`, location);
  }

  editLocation(location: any) {
    return this.http.put(`${this.apiUrl}/locations/${location._id}`, location);
  }

  deleteLocation(id: any) {
    return this.http.delete(`${this.apiUrl}/locations/${id}`);
  }
}
