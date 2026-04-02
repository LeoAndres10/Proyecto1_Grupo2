import { Routes } from '@angular/router';
import { Login } from './component/login/login';
import { Users } from './component/users/users';
import { Home } from './component/home/home';
import { Vehiculos } from './component/vehiculos/vehiculos';
import { Clientes } from './component/clientes/clientes';
import { Conversor } from './component/convertir/conversor';
import { Ventas } from './component/ventas/ventas';
import { Repuestos } from './component/repuestos/repuestos';
import { Inventario } from './component/inventario/inventario';
import { Cotizaciones } from './component/cotizaciones/cotizaciones';
import { firebaseAuthGuard } from './component/guards/firebase-auth-guard';
import { supabaseAuthGuard } from './component/guards/supabase-auth-guard';
import { Vercotizaciones } from '../app/component/vercotizaciones/vercotizaciones';
export const routes: Routes = [
    
         {
    path: 'home',
    canActivate: [supabaseAuthGuard],
    loadComponent: () =>
      import('../app/component/home/home').then(m => m.Home)
  },
  {
    path: 'inventario',
    canActivate: [supabaseAuthGuard],
    loadComponent: () =>
      import('../app/component/inventario/inventario').then(m => m.Inventario)
  },
  
  {
    path: 'login',
    loadComponent: () =>
      import('../app/component/login/login').then(m => m.Login)
  },
  {
    path: 'repuestos',
    canActivate: [supabaseAuthGuard],
    loadComponent: () =>
      import('../app/component/repuestos/repuestos').then(m => m.Repuestos)
  },
  {
    path: 'cotizaciones',
    canActivate: [supabaseAuthGuard],
    loadComponent: () =>
      import('../app/component/cotizaciones/cotizaciones').then(m => m.Cotizaciones)
  },
  {
    path: 'verfacturas',
    canActivate: [supabaseAuthGuard],
    loadComponent: () =>
      import('../app/component/verfacturas/verfacturas').then(m => m.Verfacturas)
  },
  {
  path: 'vercotizaciones',
  canActivate:[supabaseAuthGuard],
  loadComponent: () =>
    import('../app/component/vercotizaciones/vercotizaciones')
      .then(m => m.Vercotizaciones)
},
  { path: '**', redirectTo: 'login' }

  ];
 
