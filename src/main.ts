import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(AppComponent,{
 providers: [
  provideRouter(routes),
  provideHttpClient(), //registers HttpClientModule
  importProvidersFrom(ReactiveFormsModule), //registers ReactiveFormsModule
 ]
})
  .catch((err) => console.error(err));
