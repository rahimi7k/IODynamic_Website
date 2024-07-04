import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilebankComponent } from './mobilebank.component';

describe('MobilebankComponent', () => {
  let component: MobilebankComponent;
  let fixture: ComponentFixture<MobilebankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilebankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilebankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
