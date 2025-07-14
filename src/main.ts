import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';

bootstrapApplication(AppComponent,{
 providers: [
  provideRouter(routes),
  provideHttpClient(), //registers HttpClientModule
  importProvidersFrom(ReactiveFormsModule, //registers ReactiveFormsModule
  BrowserAnimationsModule,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule.forRoot({showForeground:true}), // loader on route changes
  NgxUiLoaderHttpModule.forRoot({
    showForeground: true, // Show the loader on HTTP requests  
  })) //registers NgxUiLoaderModule
 ]
})
  .catch((err) => console.error(err));
