import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management-options',
  standalone: false,
  
  templateUrl: './management-options.component.html',
  styleUrl: './management-options.component.css'
})
export class ManagementOptionsComponent {

  constructor(private router: Router) {}

  options = [
    { title: 'Location Types Management' },
    { title: 'Work Packages Management' },
    { title: 'UOM Management' },
    { title: 'Assign UOM to Work Packages' },
  ];

  navigate(url: string) {
    if (url === "Location Types Management") {
      this.router.navigate(['location-types']);
    }
    if (url === "Work Packages Management") {
      this.router.navigate(['work-package']);
    }
    if (url === "UOM Management") {
      this.router.navigate(['uom-management']);
    }
    if (url === "Assign UOM to Work Packages") {
      this.router.navigate(['uom-wp']);
    }
  }
}
