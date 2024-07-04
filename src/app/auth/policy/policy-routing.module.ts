import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicyComponent } from './policy.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [{
  path: '',
  component: PolicyComponent,
  children: [
    {
      path: 'privacy-policy',
      component: PrivacyComponent,
    },

  ],
}];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyRoutingModule { }
