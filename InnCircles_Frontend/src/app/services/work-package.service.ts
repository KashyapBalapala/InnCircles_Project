import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkPackageService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  getWorkPackagesByType(id: any) {
    return this.http.get(`${this.apiUrl}/work-packages/location-type/${id}`);
  }

  updateWorkPackage(workPackage: any) {
    return this.http.put(`${this.apiUrl}/work-packages/${workPackage._id}`, workPackage);
  }

  addWorkPackage(workPackage: any) {
    return this.http.post(`${this.apiUrl}/work-packages`, workPackage);
  }

  deleteWorkPackage(id: any) {
    return this.http.delete(`${this.apiUrl}/work-packages/${id}`);
  }

  getWpUoms(locationTypeId: any) {
    return this.http.get(`${this.apiUrl}/work-packages/uom/${locationTypeId}`);
  }

  deleteUOMToWP(workPackageId: any, uomId: any) {
    
    return this.http.delete(`${this.apiUrl}/work-packages/${workPackageId}/uoms/${uomId}`);
  }

  addMultipleUoms(uomIds: any, id: any) {
    return this.http.post(`${this.apiUrl}/work-packages/${id}/uoms`, uomIds);
  }
}
