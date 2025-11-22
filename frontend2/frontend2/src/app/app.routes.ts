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

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'users', component: Users },
    { path: 'home', component: Home },
    { path: 'vehiculos', component: Vehiculos },
    { path: 'clientes', component: Clientes },
    { path:'convertir/:moneda', component: Conversor},
    { path: 'vehiculos', component: Vehiculos },
    { path: 'vehiculos/eliminar/:id', component: Vehiculos },
    {path: 'vehiculos/actualizar/:id', component: Vehiculos },
    {path: 'repuestos/eliminar/:id', component:Repuestos},
    {path: 'ventas', component:Ventas},
    {path: 'repuestos', component: Repuestos},
    {path: 'repuestos/actualizar/:id', component:Repuestos},
    {path: 'repuestos/agregar/:id', component:Repuestos},
    {path: 'repuestos/inventario', component:Inventario},
    {path: 'repuestos/inventario/todos', component:Inventario},
    {path: 'repuestos/inventario/agregar-compra', component:Repuestos},
    {path: 'repuestos/:id', component: Repuestos},
    {path: 'repuestos/buscar', component: Repuestos},
        {path: 'repuestos/todos', component:Repuestos},
         {path: 'repuestos/registrar', component:Repuestos},

  ];
 
