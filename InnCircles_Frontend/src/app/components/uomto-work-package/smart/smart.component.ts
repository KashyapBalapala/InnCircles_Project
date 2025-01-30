import { Component } from '@angular/core';

@Component({
  selector: 'app-smart',
  templateUrl: './smart.component.html',
  styleUrl: './smart.component.css'
})
export class SmartComponent {

  isFirstScreen = true;
  property: any;

  changeScreen(property: any) {
    this.isFirstScreen = !this.isFirstScreen;
    this.property= property;
  }
}
