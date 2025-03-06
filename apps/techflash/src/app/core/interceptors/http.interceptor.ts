import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { SandboxService } from '@techflash/sandbox';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export const httpInterceptor: HttpInterceptorFn = (
	req: HttpRequest<unknown>,
	next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
	// Clone the request to add any headers or modify as needed

	const service = inject(SandboxService);

	const modifiedReq = req.clone({
		setHeaders: {
			// Add any headers here, for example:
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});

	console.log(`Request: ${modifiedReq.method} ${modifiedReq.url}`);

	const apiRequest = modifiedReq.url.includes('/api/');

	return next(modifiedReq).pipe(
		tap((event) => {
			if (apiRequest) service.setPendingRequest(modifiedReq.url);
		}),
		finalize(() => {
			if (apiRequest) service.setPendingRequest(modifiedReq.url, 'remove');

			// Log when the request is completed (success or error)
			console.log(`Request completed: ${modifiedReq.url}`);
		}),
	);
};
