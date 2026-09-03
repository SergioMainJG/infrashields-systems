import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Infrashield Systems',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'quienes-somos',
    title: 'Quienes somos | Infrashield Systems',
    loadComponent: () =>
      import('./pages/quienes-somos/quienes-somos').then((m) => m.QuienesSomos),
  },
  {
    path: 'nuestros-productos',
    title: 'Nuestros productos | Infrashield Systems',
    loadComponent: () =>
      import('./pages/nuestros-productos/nuestros-productos').then((m) => m.NuestrosProductos),
  },
  {
    path: 'servicios',
    title: 'Servicios | Infrashield Systems',
    loadComponent: () => import('./pages/servicios/servicios').then((m) => m.Servicios),
  },
  {
    path: 'contactanos',
    title: 'Contáctanos | Infrashield Systems',
    loadComponent: () => import('./pages/contactanos/contactanos').then((m) => m.Contactanos),
  },
];
