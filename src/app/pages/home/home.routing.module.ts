import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  /*children: [
    {
      path: 'home',
      component: HomeComponent,
      // loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    }]*/
  }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {
}
