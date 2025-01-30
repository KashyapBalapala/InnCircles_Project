import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPackagesManagementComponent } from './work-packages-management.component';

describe('WorkPackagesManagementComponent', () => {
  let component: WorkPackagesManagementComponent;
  let fixture: ComponentFixture<WorkPackagesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkPackagesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkPackagesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
