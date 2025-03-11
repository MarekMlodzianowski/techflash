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
				redirectTo: 'presentation',
			},
			{
				path: 'presentation',
				loadComponent: () =>
					import('./presentation/presentation.component').then((m) => m.PresentationComponent),
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
			{
				path: 'country/:countryCode',
				loadComponent: () => import('./country/country.component').then((m) => m.CountryComponent),
			},
		],
	},
];
