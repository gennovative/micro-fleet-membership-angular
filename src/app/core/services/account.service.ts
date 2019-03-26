import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { TableDataService } from '@@core/data/interfaces/service';
import { IAccount } from '../interfaces/IAccount';
import { ApiRequestService } from '@@core/services/api-request.service';
import { environment } from '../../../environments/environment';
import { Role } from '@@core/models/role';

@Injectable()
export class AccountService implements TableDataService<IAccount> {

	constructor(
		private _apiRequestService: ApiRequestService,

		private _httpClient: HttpClient,
	) {
	}

	public add(account: IAccount): Observable<IAccount> {
		const {username, password, role} = account;

		const headers = this._apiRequestService.appendAccessToken();
		return this._httpClient.post(
			`${environment.API_URL}accounts/`,
			{
				model: {
					username,
					password,
					roleId: role,
				},
			},
			{headers},
		).pipe(
			map(res => {
				if (res) {
					const acc: any = res;
					const resId = acc.id, resUsername = acc.username, resRole = acc.role;
					return {id: resId, username: resUsername, role: resRole};
				}
				return null;
			}),
		);
	}

	public get(id: string): Observable<IAccount> {
		const headers = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(`${environment.API_URL}accounts/${id}`, {headers}).pipe(
			map(res => {
				if (res) {
					const acc: any = res;
					const resId = acc.id, resUsername = acc.username, resRole = acc.role;
					return {id: resId, username: resUsername, role: resRole};
				}
				return null;
			}),
		);
	}

	public fetchData(pageIndex: number, pageSize: number, sortBy: string, sortType: string): Observable<IAccount[]> {
		const headers = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(`${environment.API_URL}accounts/page/${pageIndex}/${pageSize}/${sortBy}/${sortType}`, {headers}).pipe(
			map(res => {
				if (res) {
					const response: any = res;
					return response;
				}
				return null;
			}),
		);
	}

	public delete(idArray: number[]): Observable<number> {
		const headers = this._apiRequestService.appendAccessToken();

		const queryString = idArray.map(val => {
			return 'id=' + encodeURIComponent(String(val));
		}).join('&');

		return this._httpClient.delete(`${environment.API_URL}accounts/soft?${queryString}`, {headers}).pipe(
			map(res => {
				if (res) {
					return Number(res);
				}
				return null;
			}),
		);
	}

	public update(account: IAccount): Observable<IAccount> {
		const headers = this._apiRequestService.appendAccessToken();
		return this._httpClient.patch(`${environment.API_URL}accounts/`, {model: account}, {headers}).pipe(
			map(data => {
				if (data) {
					const res: any = data;
					return res;
				}
				return null;
			}),
		);
	}

	public searchGlobal(keyword: string): Observable<IAccount[]> {
		return null;
	}

	public getRoles(): Observable<Role[]> {
		const headers = this._apiRequestService.appendAccessToken();

		return this._httpClient.get(`${environment.API_URL}roles/page/1/100/`, {headers}).pipe(
			map(res => {
				const roles: any = res;
				if (res) {
					return Object.values(roles.data);
				}
				return null;
			}),
		);
	}
}
