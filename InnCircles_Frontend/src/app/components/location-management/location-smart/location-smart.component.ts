import { Component } from '@angular/core';

@Component({
  selector: 'app-location-smart',
  templateUrl: './location-smart.component.html',
  styleUrl: './location-smart.component.css'
})
export class LocationSmartComponent {
  constructor() {}

  isFirstScreen = true;
  locationType = {};

  changeScreen(event: any) {
    this.locationType = event;
    this.isFirstScreen = false;
  }
}
