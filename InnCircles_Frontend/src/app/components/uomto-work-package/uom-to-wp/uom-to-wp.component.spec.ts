import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UomToWpComponent } from './uom-to-wp.component';

describe('UomToWpComponent', () => {
  let component: UomToWpComponent;
  let fixture: ComponentFixture<UomToWpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UomToWpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UomToWpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
