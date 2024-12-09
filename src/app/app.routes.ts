import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    component: TaskManagerComponent, 
    ...canActivate(() => redirectUnauthorizedTo(['login'])) 
  },
  { path: '**', redirectTo: 'login' },
];
