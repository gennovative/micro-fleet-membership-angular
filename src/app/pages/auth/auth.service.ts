import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { AuthData } from './models/authData';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '@@core/services/storage.service';

@Injectable()
export class AuthService {

	constructor(
		private _httpClient: HttpClient,
		private _storageService: StorageService,
	) { }

	public authenticate(authData: AuthData): Observable<any> {
		return this._httpClient.post(environment.API_URL + 'auth/login', authData);
	}
}
