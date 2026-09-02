import { Routes } from '@angular/router';

import { InicioComponent } from './pages/inicio/inicio';
import { LoginComponent } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  {path: '', component: InicioComponent },
  {path: 'login', component: LoginComponent },
  {path: 'dashboard', component: Dashboard }
];