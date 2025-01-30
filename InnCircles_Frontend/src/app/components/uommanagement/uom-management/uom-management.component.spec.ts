import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UOMManagementComponent } from './uom-management.component';

describe('UOMManagementComponent', () => {
  let component: UOMManagementComponent;
  let fixture: ComponentFixture<UOMManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UOMManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UOMManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
