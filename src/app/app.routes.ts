import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    children: [
      {
        path: 'welcome',
        loadComponent: () =>
          import('./home/welcome/welcome.page').then((m) => m.WelcomePage),
      },
      {
        path: 'camera',
        loadComponent: () =>
          import('./home/camera/camera.page').then((m) => m.CameraPage),
      },
      {
        path: 'weather',
        loadComponent: () =>
          import('./home/weather/weather.page').then((m) => m.WeatherPage),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home/welcome',
    pathMatch: 'full',
  },
];
