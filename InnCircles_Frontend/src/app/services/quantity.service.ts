import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuantityService {
  
 constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  updateQuantity(quantity: any, locationId:string) {
    return this.http.post(`${this.apiUrl}/quantity/${locationId}`, quantity);
  }

  getLocationQuantity(locationId: string) {
    return this.http.get(`${this.apiUrl}/quantity/${locationId}`);
  }
}
