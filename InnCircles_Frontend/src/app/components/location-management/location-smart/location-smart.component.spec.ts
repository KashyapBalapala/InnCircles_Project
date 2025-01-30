import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSmartComponent } from './location-smart.component';

describe('LocationSmartComponent', () => {
  let component: LocationSmartComponent;
  let fixture: ComponentFixture<LocationSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationSmartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
