import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { SessionService } from '@@core/services/session.service';
import { StorageService } from '@@core/services/storage.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthRedirectGuard implements CanActivateChild {

	constructor(
		private _router: Router,
		private _sessionService: SessionService,
		private _storageService: StorageService,
	) { }

	public canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if (this._storageService.getCurrentAccessToken()) {
			if (this._sessionService.checkIfActive()) {
				if (this._sessionService.checkShouldRenew()) {
					this._sessionService.renewSession().subscribe(res => {
						const newToken: any = res;
						this._storageService.setAccessToken(newToken.token);
					});
				}
				return true;
			}
			this._sessionService.removeSession();
			return false;
		}
		this._router.navigate(['auth']);
		return false;
	}
}
