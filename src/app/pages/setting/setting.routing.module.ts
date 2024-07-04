import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SettingComponent } from './setting.component';

const routes: Routes = [{
  path: '',
  component: SettingComponent,
  }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {
}
