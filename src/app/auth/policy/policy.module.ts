import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyComponent } from './policy.component';

import { PrivacyComponent } from './privacy/privacy.component';

import {
  NbCardModule,
  NbLayoutModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [PolicyComponent, PrivacyComponent],
  imports: [
    RouterModule,
    CommonModule,
    PolicyRoutingModule,
    NbCardModule,
    NbLayoutModule,
    ThemeModule,
  ],
})
export class PolicyModule { }
