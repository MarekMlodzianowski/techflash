import { Route } from '@angular/router';

export const sandboxRoutes: Route[] = [
  {
    path: 'sandbox',

    loadComponent: () =>
      import('./sandbox.component').then((m) => m.SandboxComponent),
  },
];
