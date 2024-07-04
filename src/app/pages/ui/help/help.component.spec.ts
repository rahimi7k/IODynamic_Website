import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CircleLoadAnimationComponent } from './circle-load-animation.component';

describe('CircleLoadAnimationComponent', () => {
  let component: CircleLoadAnimationComponent;
  let fixture: ComponentFixture<CircleLoadAnimationComponent>;

  beforeEach( waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CircleLoadAnimationComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleLoadAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
