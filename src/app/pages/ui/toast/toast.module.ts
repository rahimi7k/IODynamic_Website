import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast } from './toast.component';

@NgModule({
  declarations: [Toast],
  imports: [
    CommonModule,
  ],
  exports: [Toast],
})
export class ToastModule { }
