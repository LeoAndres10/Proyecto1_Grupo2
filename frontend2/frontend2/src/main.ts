import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {routes} from './app/app.routes'
import { Repuestos } from './app/component/repuestos/repuestos';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from '../src/app/interceptor'; 
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
