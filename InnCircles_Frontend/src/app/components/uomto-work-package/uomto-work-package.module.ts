import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UomToWpComponent } from './uom-to-wp/uom-to-wp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UOMToWorkPackageRoutingModule } from './uomto-work-package.routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ChipsModule } from 'primeng/chips';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { DialogModule } from 'primeng/dialog';
import { QuantitiesComponent } from './quantities/quantities.component';
import { SmartComponent } from './smart/smart.component';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [
    UomToWpComponent,
    QuantitiesComponent,
    SmartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UOMToWorkPackageRoutingModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    ChipsModule,
    MatFormField,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    DialogModule,
    AccordionModule,
    TableModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UOMToWorkPackageModule { }
