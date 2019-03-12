import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

import { SessionService } from '@@core/services/session.service';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class LoggedOutGuard implements CanActivateChild, CanActivate {

	constructor(
		private _sessionService: SessionService,
	) { }

	public canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return !this._sessionService.checkIfActive();
	}

	public canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return !this._sessionService.checkIfActive();
	}
}
