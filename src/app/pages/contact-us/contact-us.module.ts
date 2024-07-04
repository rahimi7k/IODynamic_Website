import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { NbCardModule } from '@nebular/theme';
import { ContactUsRoutingModule } from './contact-us.routing.module';
import { ButtonModule } from '../ui/button/button.module';

@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    ContactUsRoutingModule,
    CommonModule,
    NbCardModule,
    CommonModule,
    ButtonModule],
})
export class ContactUsModule { }
