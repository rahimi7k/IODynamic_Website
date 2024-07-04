import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ApiComponent } from './api.component';

const routes: Routes = [{
  path: '',
  component: ApiComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiRoutingModule {
}
