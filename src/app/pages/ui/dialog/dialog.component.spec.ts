import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';

describe('PopUpComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach( waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DialogComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
