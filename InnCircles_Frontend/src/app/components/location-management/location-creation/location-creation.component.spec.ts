import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCreationComponent } from './location-creation.component';

describe('LocationCreationComponent', () => {
  let component: LocationCreationComponent;
  let fixture: ComponentFixture<LocationCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
