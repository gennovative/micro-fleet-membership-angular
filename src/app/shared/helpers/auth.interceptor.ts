import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '@@core/services/session.service';
import { concatMap, catchError } from 'rxjs/operators';
import { StorageService } from '@@core/services/storage.service';
import { ApiRequestService } from '@@core/services/api-request.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor (
		private _apiRequestService: ApiRequestService,
		private _sessionService: SessionService,
		private _storageService: StorageService,
		private _router: Router,
	) { }

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (req.headers.has('authorization') && !req.headers.has('X-No-Authorization')) {
			if (this._storageService.getCurrentAccessToken()) {
				if (this._sessionService.checkIfActive()) {
					if (this._sessionService.checkShouldRenew()) {
						return this._sessionService.renewSession().pipe(
							concatMap(res => {
								const newToken: any = res;
								this._storageService.setAccessToken(newToken.token);
								req = req.clone({
									headers: this._apiRequestService.appendAccessToken(),
								});
								return next.handle(req);
							}),
						);
					}
					return next.handle(req).pipe(
						catchError(err => {
							if (err.status === 401) {
								const errMessage: string = err.error;
								if (errMessage === 'invalid signature') {
									this._sessionService.removeSession();
									return null;
								}
							}
							return next.handle(req);
						}),
					);
				}
				this._sessionService.removeSession();
			}
			this._router.navigate(['auth']);
		}
		return next.handle(req);
	}
}
