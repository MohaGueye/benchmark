import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import 'zone.js';

bootstrapApplication(AppComponent, {
  providers: [provideAnimations()]
}).catch((err) => console.error(err));
