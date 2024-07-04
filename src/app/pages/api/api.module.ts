import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiComponent } from './api.component';
import { NbCardModule } from '@nebular/theme';
import { ApiRoutingModule } from './api.routing.module';

@NgModule({
  declarations: [ApiComponent],
  imports: [
    ApiRoutingModule,
    NbCardModule,
    CommonModule,
  ],
})
export class ApiModule { }
