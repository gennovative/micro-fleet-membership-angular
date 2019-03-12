import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '@@core/services/session.service';
import { StorageService } from '@@core/services/storage.service';
import { ApiRequestService } from '@@core/services/api-request.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
	constructor (
		private _apiRequestService: ApiRequestService,
		private _messageService: MessageService,
		private _sessionService: SessionService,
		private _storageService: StorageService,
		private _router: Router,
	) { }

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError(err => {
				if (err instanceof HttpErrorResponse) {
					if (err.status === 412) {
						err.error.forEach((error: any) => {
							error.path.forEach((path: any) => {
								this._messageService.add({
									severity: 'error',
									data: error.message,
									// Comment for issues cause build errors. Please fix it.
									// path: `/${req.url.replace(environment.API_URL, '')}`,
									// fieldName: path,
								});
							});
						});
					}
					else {
						this._messageService.add({
							data: `${err.status} ${err.statusText}`,
							// Comment for issues cause build errors. Please fix it.
							// path: `/${req.url.replace(environment.API_URL, '')}`,
						});
					}
				}
				return next.handle(req);
			}),
		);
	}
}
