import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UomManagementService {

  constructor(private http: HttpClient) { }
  
  private apiUrl = environment.apiUrl;

  getUom() {
    return this.http.get(`${this.apiUrl}/uom`);
  }

  addUom(uom: any) {
    return this.http.post(`${this.apiUrl}/uom`, uom);
  }

  deleteUom(id: any) {
    console.log(id);
    return this.http.delete(`${this.apiUrl}/uom/${id}`);
  }

  editUom(uom: any) {
    return this.http.put(`${this.apiUrl}/uom/${uom._id}`, uom);
  }

  
}
