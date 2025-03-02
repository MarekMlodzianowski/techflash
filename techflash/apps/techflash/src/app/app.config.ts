import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
	provideRouter,
	withComponentInputBinding,
	withDisabledInitialNavigation,
	withEnabledBlockingInitialNavigation,
	withHashLocation,
	withViewTransitions,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(
			appRoutes,
			withHashLocation(),
			withDisabledInitialNavigation(),
			withEnabledBlockingInitialNavigation(),
			withComponentInputBinding(),
			withViewTransitions(),
		),
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: 'outline', subscriptSizing: 'dynamic' },
		},
	],
};
