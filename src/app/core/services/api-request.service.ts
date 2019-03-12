import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable()

export class ApiRequestService {

	constructor (
		private _storageService: StorageService,
	) { }

	public appendAccessToken(): HttpHeaders {
		let headers: HttpHeaders = new HttpHeaders();
		const currentToken: string = this._storageService.getCurrentAccessToken();
		return headers = headers.append('Authorization', 'Bearer ' + currentToken);
	}
}
