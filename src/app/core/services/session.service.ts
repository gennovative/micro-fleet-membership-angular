import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

import { StorageService } from './storage.service';
import { environment } from '../../../environments/environment';
import { ApiRequestService } from './api-request.service';
import { AuthService } from '../../pages/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()

export class SessionService {

	private _jwtHelperService = new JwtHelperService();

	constructor(
		private _apiRequestService: ApiRequestService,
		private _authService: AuthService,
		private _httpClient: HttpClient,
		private _router: Router,
		private _storageService: StorageService,
	) { }

	public checkShouldRenew(): boolean {
		const token = this._storageService.getCurrentAccessToken();
		const rememberSessionStatus = this._storageService.getRememberSessionStatus();
		try {
			const tokenExpirationStatus = this._jwtHelperService.isTokenExpired(token);
			const expirationTime = this._jwtHelperService.getTokenExpirationDate(token).getTime().valueOf();
			const now = new Date().getTime().valueOf();
			if (rememberSessionStatus) {
				return ((expirationTime - now) <= environment.tokenRenewWindow);
			}
			else {
				return ((((expirationTime - now) <= environment.tokenRenewWindow) && ((expirationTime - now) > 0)) && tokenExpirationStatus);
			}
		} catch {
			return false;
		}
	}

	public checkIfActive(): boolean {
		const token = this._storageService.getCurrentAccessToken();
		const rememberSessionStatus = this._storageService.getRememberSessionStatus();
		try {
			const tokenExpirationStatus = this._jwtHelperService.isTokenExpired(token);
			if (rememberSessionStatus) return true;
			return !tokenExpirationStatus;
		} catch {
			return false;
		}
	}

	public renewSession() {
		const token = this._jwtHelperService.decodeToken(this._storageService.getCurrentAccessToken());
		return this._httpClient.post(
			`${environment.API_URL}auth/refresh-token/` + token.accountId,
			{
				refreshToken: this._storageService.getCurrentRefreshToken(),
			},
			{
				headers: this._apiRequestService.appendAccessToken().append('X-No-Authorization', ''),
			},
		);
	}

	public removeSession(): any {
		const token = this._jwtHelperService.decodeToken(this._storageService.getCurrentAccessToken());
		const accessToken = this._storageService.getCurrentAccessToken();
		const refreshToken = this._storageService.getCurrentRefreshToken();
		if (refreshToken) {
			const headers = this._apiRequestService.appendAccessToken().append('X-No-Authorization', '');
			return this._httpClient.get(environment.API_URL + 'auth/logout', {headers}).subscribe(res => {
				this._storageService.deleteData();
				this._router.navigate(['auth']);
			});
		}
		this._router.navigate(['auth']);
	}
}
