import {
	ApplicationConfig,
	DEFAULT_CURRENCY_CODE,
	LOCALE_ID,
	provideZoneChangeDetection,
} from '@angular/core';
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
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import '@angular/common/locales/global/pl';
import { httpInterceptor } from './core/interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
	providers: [
		provideHttpClient(withInterceptors([httpInterceptor])),
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
		{ provide: LOCALE_ID, useValue: 'pl' },
		{ provide: DEFAULT_CURRENCY_CODE, useValue: 'PLN' },
	],
};
