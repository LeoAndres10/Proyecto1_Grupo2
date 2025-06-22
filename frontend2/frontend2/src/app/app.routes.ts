import { Routes } from '@angular/router';
import { Login } from './component/login/login';
import { Users } from './component/users/users';
import { Home } from './component/home/home';
import { Vehiculos } from './component/vehiculos/vehiculos';
import { Clientes } from './component/clientes/clientes';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'users', component: Users },
    { path: 'home', component: Home },
    { path: 'vehiculos', component: Vehiculos },
    { path: 'clientes', component: Clientes }
    
  ];
