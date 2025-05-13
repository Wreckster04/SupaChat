import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { SupabaseService } from './services/supabase.service';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    SupabaseService,
    importProvidersFrom(FormsModule)
  ]
};
