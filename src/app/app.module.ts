import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './@theme/components/header/header.component';
import {
  NbMenuModule,
  NbSidebarModule,
  NbLayoutModule,
  NbCardModule,
  NbThemeModule,
} from '@nebular/theme';

import { APP_INITIALIZER } from '@angular/core';
import { AppInit } from './app-init.service';
export function initializeApp(appInitService: AppInit) {
  return async (): Promise<any> => {
    return await appInitService.Init();
  };
}

import { ToastModule } from './pages/ui/toast/toast.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ThemeModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NbCardModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    ToastModule],
  providers: [HeaderComponent, AppInit,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInit],
      multi: true,
    }],

  bootstrap: [AppComponent],
})
export class AppModule {

}
