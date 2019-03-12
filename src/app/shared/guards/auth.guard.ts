import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '@@core/services/session.service';
import { StorageService } from '@@core/services/storage.service';

@Injectable()
export class AuthGuard implements CanActivateChild {

	constructor(
		private _router: Router,
		private _sessionService: SessionService,
		private _storageService: StorageService,
	) { }

	public canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
			return this._sessionService.checkIfActive();
	}

	public canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
			if (this._storageService.getCurrentAccessToken()) {
				if (this._sessionService.checkIfActive()) {
					if (this._sessionService.checkShouldRenew()) {
						this._sessionService.renewSession()
						.subscribe(res => {
							const newToken: any = res;
							this._storageService.setAccessToken(newToken.token);
						});
					}
				}
				return true;
			}
			return false;
	}
}
