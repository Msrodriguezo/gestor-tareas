import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http'; 

const updatedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideHttpClient(), // Configuración correcta de HttpClient en Angular 19
  ]
};

bootstrapApplication(AppComponent, updatedAppConfig)
  .catch((err) => console.error(err));
