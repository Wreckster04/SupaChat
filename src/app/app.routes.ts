import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ChatComponent } from './chat/chat.component';

export const appRoutes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'chat', component: ChatComponent }
];
