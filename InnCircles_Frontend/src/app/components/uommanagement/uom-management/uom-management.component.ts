import { Component } from '@angular/core';
import { UomManagementService } from '../../../services/uom-management.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-uom-management',
  standalone: false,
  templateUrl: './uom-management.component.html',
  styleUrls: ['./uom-management.component.css']
})
export class UOMManagementComponent {

  constructor(private uomService: UomManagementService) {}

  // List of UOMs
  uoms: any[] = [];

  newUOM: string = '';
  newUOMAbbreviation: string = '';
  editingUOM: any = null;

  ngOnInit() {
    this.fetchUOM();
  }

  fetchUOM() {
    this.uomService
        .getUom()
        .pipe(
          catchError((error) => {
            alert('An error occurred: ' + error.message);
            return of([]);
          })
        )
        .subscribe((data: any) => {
          this.uoms = data;
        });
  }

  addUOM() {
    if (this.newUOM.trim() && this.newUOMAbbreviation.trim()) {
      const uom = {
        name: this.newUOM,
        abbreviation: this.newUOMAbbreviation,
        description: ''
      };
      this.uomService
          .addUom(uom)
          .pipe(
            catchError((error) => {
              alert('An error occurred: ' + error.message);
              return of([]);
            })
          )
          .subscribe((data: any) => {
            this.fetchUOM();
            this.newUOM = '';      
            this.newUOMAbbreviation = '';
          });
    }
    
  }

  editUOM(uom: any) {
    this.editingUOM = { ...uom };
  }

  deleteUOM(uom: any) {
    console.log(uom._id);
    this.uomService
    .deleteUom(uom._id)
    .pipe(
      catchError((error) => {
        alert('An error occurred: ' + error.message);
        return of([]);
      })
    )
    .subscribe((data: any) => {
      this.fetchUOM();
    });
  }

  saveUOM(uom: any) {
    this.uomService
    .editUom(uom)
    .pipe(
      catchError((error) => {
        alert('An error occurred: ' + error.message);
        return of([]);
      })
    )
    .subscribe((data: any) => {
      this.fetchUOM();
      this.editingUOM = {};
    });
  }
}
