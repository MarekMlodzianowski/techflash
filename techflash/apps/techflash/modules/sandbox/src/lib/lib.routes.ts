import { Route } from '@angular/router';
import { SandboxRootComponent } from './sandbox-root.component';

export const sandboxRoutes: Route[] = [
	{
		path: 'sandbox',
		component: SandboxRootComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'playground',
			},
			{
				path: 'playground',

				loadComponent: () =>
					import('./playground/playground.component').then((m) => m.PlaygroundComponent),
			},
			{
				path: 'playground/:id',

				loadComponent: () =>
					import('./playground/playground.component').then((m) => m.PlaygroundComponent),
			},
		],
	},
];
