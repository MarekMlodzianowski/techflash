import { Route } from '@angular/router';
import { sandboxRoutes } from '@techflash/sandbox';

export const appRoutes: Route[] = [
	{ path: '', redirectTo: 'sandbox', pathMatch: 'full' },

	...sandboxRoutes,
];
