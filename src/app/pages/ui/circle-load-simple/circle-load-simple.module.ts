import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleLoadSimpleComponent } from './circle-load-simple.component';

@NgModule({
    declarations: [CircleLoadSimpleComponent],
  imports: [
    CommonModule,
  ],
    exports: [CircleLoadSimpleComponent],
})
export class CircleLoadSimpleModule { }
