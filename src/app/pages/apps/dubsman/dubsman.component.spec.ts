import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DubsmanComponent } from './dubsman.component';

describe('DubsmanComponent', () => {
  let component: DubsmanComponent;
  let fixture: ComponentFixture<DubsmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DubsmanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DubsmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
