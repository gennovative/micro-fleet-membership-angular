import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { take, mergeMap } from 'rxjs/operators';
import { AccountService } from '../account.service';
import { of } from 'rxjs/observable/of';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { RoleService } from '../role.service';
import { StorageService } from '@@core/services/storage.service';

@Injectable()
export class AccountDetailsResolver {
	constructor (
		private _accountService: AccountService,
	) { }

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
		const id = route.paramMap.get('id');

		return this._accountService.get(id).pipe(
			take(1),
			mergeMap(acc => {
				if (acc) {
					return of(acc);
				}
				return EMPTY;
			}),
		);
	}
}

@Injectable()
export class ProfileDetailsResolver {
	constructor (
		private _accountService: AccountService,
		private _storageService: StorageService,
	) { }

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
		const id = this._storageService.getCurrentUser().id;

		return this._accountService.get(id).pipe(
			take(1),
			mergeMap(acc => {
				if (acc) {
					return of(acc);
				}
				return EMPTY;
			}),
		);
	}
}

@Injectable()
export class RoleDetailsResolver {
	constructor (
		private _roleService: RoleService,
	) { }

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
		const id = route.paramMap.get('id');

		return this._roleService.get(id).pipe(
			take(1),
			mergeMap(acc => {
				if (acc) {
					return of(acc);
				}
				return EMPTY;
			}),
		);
	}
}
